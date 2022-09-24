import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const tableName = {
  Projects: 'projects',
  Tasks: 'tasks',
  Works: 'works',
}

const db = SQLite.openDatabase(
  {
    name: 'TaskWatchDB',
    location: 'Library',
  },
  () => { },
  error => { console.log(error) }
);

const createProjectsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS "
      + tableName.Projects
      + "(ID INTEGER PRIMARY KEY AUTOINCREMENT,"
      + "name TEXT NOT NULL,"
      + "explanation TEXT);"
    )
  });
}

export const createTables = () => {
  createProjectsTable();
}

export const getProjects = () => {
  var ret;
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM " + tableName.Projects,
        [],
        (tx, results) => {
          /*
          var len = results.rows.length;
          console.log(len);
          if (len > 0) {
            console.log(results.rows.item(1).Name);
          }
          */
          // const name = results.rows.item(0).name;
          console.log(results.rows.length);
        }
      );
    });
  } catch (error) {
    console.log('getProjects: ' + error);
  }
}

export const addProject = async (name: string) => {
  if (name.length == 0) {
    Alert.alert('Warning!', 'Please write your data.')
  } else {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "INSERT INTO " + tableName.Projects + " (name, explanation) VALUES (?, ?)",
          [name, 'sample exp']
        );
      });
      console.log('add project');
    } catch (error) {
      console.log('addProject: ' + error);
    }
  }
}


