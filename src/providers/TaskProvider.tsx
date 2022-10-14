import React, { useState, useEffect, useRef, PropsWithChildren, useContext } from 'react';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { openRealm, BSON } from '../realm';
import { ObjectId } from 'mongodb';

const ProjectsContext = React.createContext(null);

const TasksProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const realmRef = useRef(null);
  useEffect(() => {
    realmRef.current = openRealm();

    const projects = realmRef.current.objects('Project').sorted('createdAt', false);
    setProjects(projects);

    // Project のデータが更新されたら setProjects する
    projects.addListener(() => {
      const projects = realmRef.current.objects('Project').sorted('createdAt', false);
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
  const deleteItem = (item) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(item);
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

  // タスクの更新
  const updateTask = (task, name, description) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      task.name = name;
      task.description = description;
    });
  };

  // タスクの新規作成
  const createTask = (project) => {
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
  };

  // ワークの新規作成
  const createWork = (task: any) => {
    const projectRealm = realmRef.current;
    let works = task.works;
    const ret = projectRealm.write(() => {
      works.push({
        _id: new BSON.ObjectID(),
        startTime: null,
        endTime: null,
        pauseTime: null,
        workTime: null,
        inActive: false,
        createdAt: new Date(),
      });
    });
    console.log(ret)
  };

  // 最後に追加したワークを取得する
  const getResentWork = () => {
    const resentWork = realmRef.current.objects('Work').sorted('createdAt', false)[0]
    return resentWork
  }

  // ワークの更新
  const updateWork = (work: any, startTime: Date, endTime: Date, pauseTime: Date) => {
    const projectRealm = realmRef.current
    projectRealm.write(() => {
      work.pauseTime = pauseTime;
    })
  }

  // useTasks フックで Task を操作できるようにする
  return (
    <ProjectsContext.Provider
      value={{
        createProject,
        deleteItem,
        updateProject,
        createTask,
        updateTask,
        createWork,
        updateWork,
        getResentWork,
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
