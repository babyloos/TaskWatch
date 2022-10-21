import React, { useState, useEffect, useRef, PropsWithChildren, useContext } from 'react';
import { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
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
      const id = Math.floor(Math.random() * 999999)
      projectRealm.create('Project', {
        _id: id,
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
    const id = Math.floor(Math.random() * 999999)
    projectRealm.write(() => {
      tasks.push({
        _id: id,
        name: '新しいタスク',
        isDone: false,
        createdAt: new Date(),
      });
    });
  };

  // 指定したtaskの合計作業時間を取得する
  // msで返す
  const getTaskTotalTime = (task: any): number => {
    var totalTime = 0
    for (var i=0; i<task.works.length; i++) {
      totalTime += task.works[i].workTime
    }
    /*
    task.works.forEach((work: any) => {
      totalTime += work.workTime
    })
    */
    return totalTime
  }

  // ワークの新規作成
  const createWork = (task: any) => {
    const projectRealm = realmRef.current;
    let works = task.works;
    const id = Math.floor(Math.random() * 999999)
    projectRealm.write(() => {
      works.push({
        _id: id,
        startTime: null,
        endTime: null,
        pauseTime: null,
        workTime: null,
        inActive: false,
        isSaved: false,
        createdAt: new Date(),
      });
    });
  };

  // 最後に追加したワークを取得する
  const getResentWork = () => {
    const resentWork = realmRef.current.objects('Work').sorted('createdAt', true)[0]
    return resentWork
  }

  // ワークの更新
  const updateWork = (work: any, startTime?: Date, endTime?: Date, inActive?: boolean, pauseTime?: Date, workTime?: Int32, isSaved?: boolean) => {
    const projectRealm = realmRef.current
    projectRealm.write(() => {
      work.startTime = startTime ?? work.startTime;
      work.endTime = endTime ?? work.endTime;
      work.inActive = inActive ?? work.inActive;
      work.pauseTime = pauseTime ?? work.pauseTime;
      work.workTime = workTime ?? work.workTime;
      work.isSaved = isSaved ?? work.isSaved;
    })
  }

  // 未保存のworkを取得
  const getActiveWork = () => {
    const work = realmRef.current?.objects('Work').filtered('isSaved == false')[0]
    return work
  }

  // endTimeがnullのworkを削除
  const delNullWorks = (task: any) => {
    const nullWorks = task.works.filtered('endTime == null')
    if (nullWorks.length > 0) {
      nullWorks.forEach((work: object) => {
        deleteItem(work)
      })
    }
  }

  // 指定のworkを保持するTaskを取得する
  const getTaskSpecifyWork = (work: any) => {
    const tasks = realmRef.current.objects('Task')
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].works.indexOf(work) !== -1) {
        return tasks[i]
      }
    }
    return null
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
        getTaskTotalTime,
        createWork,
        updateWork,
        getResentWork,
        getActiveWork,
        delNullWorks,
        getTaskSpecifyWork,
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
