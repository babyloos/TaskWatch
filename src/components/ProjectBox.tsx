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
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NavigationProp, NavigationState, StackNavigationState } from '@react-navigation/native';
import { useProjects } from '../providers/TaskProvider';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type PropType = {
  navigation: NavigationState;
  task: any;
};

const ProjectBox = ({ navigation, project }: PropType) => {
  const { deleteItem } = useProjects();
  const onPress = () => {
    navigation.navigate('ProjectDetail', { title: project.name });
  }

  return (
    <View style={styles.projectBox}>
      <View style={[styles.infos, { flex: 1 }]}>
        <Text>プロジェクト名: {project.name}</Text>
        <Text>説明: {project.decription}</Text>
      </View>
    </View>
  );
}

export default ProjectBox;

const styles = StyleSheet.create({
  projectBox: {
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    height: 64,
    marginTop: 18,
    marginStart: 12,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  },
});
