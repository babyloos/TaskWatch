import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'TestDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const App = () => {

  const [name, setName] = useState('');

  useEffect(() => {
    createTable();
    getData();
  });

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "Users "
        + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
      )
    });
  }

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, Age FROM Users",
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log(len);
            if (len > 0) {
              console.log(results.rows.item(0).Name);
            }
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }

  const setData = async () => {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text>name: {name}</Text>
      </View>
      <View style={{ marginTop: 28 }}>
        <TextInput
          placeholder='your name'
          onChangeText={(value) => {
            setName(value);
          }} />
      </View>
      <View style={{ marginTop: 28 }}>
        <Button title='enter' onPress={() => {
          setData();
        }} />
      </View>
    </View>
  );
}

export default App;
