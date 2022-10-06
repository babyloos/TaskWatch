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
        <Text>プロジェクト名: {project.name}</Text>
        <Text>説明: {project.description}</Text>
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
