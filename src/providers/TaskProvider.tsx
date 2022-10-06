import React, { useState, useEffect, useRef, PropsWithChildren, useContext } from 'react';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { openRealm, BSON } from '../realm';
import { ObjectId } from 'mongodb';
import { Project } from '../models/Project';

const ProjectsContext = React.createContext(null);

const TasksProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const realmRef = useRef(null);
  useEffect(() => {
    realmRef.current = openRealm();

    const projects = realmRef.current.objects('Project').sorted('createdAt', true);
    setProjects(projects);

    // Project のデータが更新されたら setProjects する
    projects.addListener(() => {
      const projects = realmRef.current.objects('Project').sorted('createdAt', true);
      setProjects(projects);
    });

    return () => {
      // クリーンアップ
      if (realmRef.current) {
        realmRef.current.close();
      }
    };
  }, []);

  // プロジェクトの新規作成
  const createProject = (newProjectName: string) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create('Project', {
        _id: new BSON.ObjectId(),
        name: newProjectName || '新しいプロジェクト',
        createdAt: new Date(),
      });
    });
  };

  // プロジェクトを削除する
  const deleteItem = (project) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(project);
    });
  };

  // プロジェクトの更新
  const updateProject = (project, name, description) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      project.name = name;
      project.description = description;
    });
  };

  // サブタスクの新規作成
  const createTask = (project: Project) => {
    const projectRealm = realmRef.current;
    let tasks = project.tasks;
    projectRealm.write(() => {
      tasks.push({
        _id: new BSON.ObjectID(),
        name: '新しいタスク',
        isDone: false,
        createdAt: new Date(),
      });
    });
  }

  // useTasks フックで Task を操作できるようにする
  return (
    <ProjectsContext.Provider
      value={{
        createProject,
        deleteItem,
        updateProject,
        createTask,
        projects,
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Project を操作するための React Hook
const useProjects = () => {
  const project = useContext(ProjectsContext);
  if (project == null) {
    throw new Error('useProjects() called outside of a TasksProvider?');
  }
  return project;
};

export { TasksProvider, useProjects };
