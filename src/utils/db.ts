import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const db = SQLite.openDatabase(
  {
    name: 'TaskWatchDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

export default db;

/*
export const createProjectsTable = (db: SQLiteDatabase) => {
  try {
    db.transaction((tx) => {
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
    console.log('createProjectsTable' + error);
  }
}

export const getData = (db: SQLiteDatabase) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM Projects",
        [],
        (tx, results) => {
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

const dbController = {
  createTables: function() {
    const db = await getDBConnection();
    createProjectsTable(db);
  },
  getDatas: function() {
    getData();
  }
}

// export default dbController;
*/
