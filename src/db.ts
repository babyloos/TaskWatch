import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'TaskWatchDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS "
      + "Users "
      + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
    )
  });
}

export const getData = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT Name, Age FROM Users",
        [],
        (tx, results) => {
          var len = results.rows.length;
          console.log(len);
          if (len > 0) {
            console.log(results.rows.item(1).Name);
          }
        }
      )
    })
  } catch (error) {
    console.log(error);
  }
}

export const setData = async (name: string) => {
  if (name.length == 0) {
    Alert.alert('Warning!', 'Please write your data.')
  } else {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "INSERT INTO Users (Name) VALUES (?)",
          [name]
        );
      })
    } catch (error) {
      console.log(error);
    }
  }
}


