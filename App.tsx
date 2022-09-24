import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {createTable, getData, setData} from './src/db';

const App = () => {

  const [name, setName] = useState('');

  useEffect(() => {
    createTable();
    getData();
  });

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
          setData(name);
        }} />
      </View>
    </View>
  );
}

export default App;
