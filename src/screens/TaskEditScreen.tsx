import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import { useProjects } from '../providers/TaskProvider';

const TaskEditScreen = (props) => {
  const { updateTask } = useProjects();
  const task = props.route.params.task;
  const [name, setName] = useState(task.name); 
  const [description, setDescription] = useState(task.description); 

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button 
          color={'#FF0000'}
          onPress={() => {
            updateTask(task, name, description);
            props.navigation.goBack();
         }} 
          title="保存"
        />
      ),
    });
    props.navigation.setOptions({title: name + ' - ' + '編集'});
  }, [updateTask, props.navigation, name, description]);

  return (
    <View style={styles.container}>
      <View style={styles.projectNameContainer}>
        <Text style={styles.projectName}>タスク名</Text>
        <TextInput
          onChangeText={(text)=>{
            setName(text);
          }}
          value={name}
          style={[styles.textInput, {height: 36}]} 
        />
      </View>
      <View style={styles.projectNameContainer}>
        <Text style={styles.projectName}>説明</Text>
        <TextInput
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
          multiline={true}
          style={[styles.textInput, {height: 256}]} 
        />
      </View>
    </View>
  );
}

export default TaskEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectNameContainer: {
    flexDirection: 'column',
    marginBottom: 48,
    alignItems: 'center',
  },
  projectName: {
    fontSize: 18,
    marginBottom: 18,
    fontWeight: 'bold',
  },
  textInput: {
    width: 240,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },
});
