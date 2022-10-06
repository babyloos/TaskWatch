import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationState } from '@react-navigation/native';
import { useProjects } from '../providers/TaskProvider';

type PropType = {
  navigation: NavigationState;
  task: any;
};

const ProjectBox = ({ navigation, project }: PropType) => {
  return (
    <View style={styles.projectBox}>
      <View>
        <Text numberOfLines={1} ellipsizeMode={'tail'}>プロジェクト名: {project.name}</Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'}>説明: {project.description}</Text>
        <Text>タスク数: </Text>
      </View>
    </View>
  );
}

export default ProjectBox;

const styles = StyleSheet.create({
  projectBox: {
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    minHeight: 64,
    marginTop: 18,
    marginStart: 12,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  },
});
