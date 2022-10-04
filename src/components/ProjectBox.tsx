import React, { useState, useEffect, isValidElement, Component, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Task,
} from 'react-native';
import DropDownMenu from './dropdownMenu';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faClock} from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NavigationProp, NavigationState, StackNavigationState } from '@react-navigation/native';
import {useTasks} from '../providers/TaskProvider';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ProjectBox = ({navigation, task}) => {
  const {deleteTask} = useTasks();
  const onPress = () => {
    navigation.navigate('ProjectEdit');
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.projectBox}>
        <View style={[styles.infos, {flex: 1}]}>
          <Text>プロジェクト名: {task.name}</Text>
          <Text>説明: {task.decription}</Text>
        </View>
        <View style={[styles.menus, {flex: 0.1}]}>
          {/*
          <DropDownMenu 
            editCallback={()=>navigation.navigate('ProjectEdit')}
            deleteCallback={()=>deleteTask(task)}/>
           */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ProjectBox;

const styles = StyleSheet.create({
  projectBox: {
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    marginTop: 18,
    marginStart: 12,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  },
  taskBox: {
    flexDirection: 'row',
    backgroundColor: '#00FFFF',
    marginTop: 12,
    marginStart: 24,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  },
  infos: {
    flex: 0.7,
  },
  menus: { 
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
  },
  addTaskButton: {
    alignItems: 'flex-end',
    marginTop: 32,
    marginRight: 38,
  } 
});
