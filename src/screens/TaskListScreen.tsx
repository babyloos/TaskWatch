import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ProjectBox from '../components/ProjectBox';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const TaskListScreen = ({navigation}) => {
  return (
    <View style={styles.body}>
      <View style={styles.projectBoxContainer}>
        <ProjectBox navigation={navigation}/>
      </View>
      <TouchableOpacity 
        style={styles.addProjectButton}
        onPress={() => console.log('add project')}>
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
