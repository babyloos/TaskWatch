import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'TaskWatchDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

export const createProjectsTable = () => {
  try {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "Projects"
        + "("
        + "ID INTEGER PRIMARY KEY AUTOINCREMENT,"
        + "name TEXT,"
        + "explanation TEXT,"
        + ");"
      );
    });
  } catch (error) {
    console.log('createProjectsTable: ' + error);
  }
}

export const getProjects = () => {
  try {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        "SELECT name FROM Projects",
        [],
        (tx: any, results: any) => {
          var len = results.rows.length;
          console.log(len);
          console.log('getDataInternal');
        }
      )
    })
  } catch (error) {
    console.log('getData' + error);
  }
}
