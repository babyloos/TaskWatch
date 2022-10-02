import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ProjectBox from '../components/ProjectBox';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';

import { useTasks } from '../providers/TaskProvider';
import { FlatList } from 'react-native-gesture-handler';
import { create } from 'react-test-renderer';

const TaskListScreen = ({ navigation }) => {
  const { createTask, deleteTask, setIsTaskDone, tasks } = useTasks();

  return (
    <View style={styles.body}>
      {/*
      <View style={styles.projectBoxContainer}>
        {/*<ProjectBox navigation={navigation} />
      </View>
      */}
      <FlatList 
        style={styles.projectBoxContainer}
        data={tasks}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem = {({item}) => (
          <ProjectBox navigation={navigation} task={item}/>
        )}/>
      <TouchableOpacity
        style={styles.addProjectButton}
        onPress={() => {
          createTask();
        }}>
        <Icon icon={faCirclePlus} size={62} />
      </TouchableOpacity>
    </View>
  );
}

export default TaskListScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  projectBoxContainer: {
    flex: 1,
  },
  addProjectButton: {
    position: 'absolute',
    bottom: 48,
    right: 48,
  },
});
