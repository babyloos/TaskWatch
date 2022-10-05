import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationState } from '@react-navigation/native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

import { useTasks } from '../providers/TaskProvider';

const ProjectDetailScreen = (props) => {
  const { createSubTask } = useTasks();
  const task = props.route.params.task;
  return (
    <View style={styles.container}>
      <View style={styles.projectBox}>
        <View style={[styles.infos, { flex: 1 }]}>
          <Text>プロジェクト名: {task.name}</Text>
          <Text>説明: {task.decription}</Text>
        </View>
      </View>
      <SwipeListView
        style={styles.projectBoxContainer}
        data={task.subTasks}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem = {({item}) => (
          <Text>item.name</Text>
        )}
        
        />
      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => {
          createSubTask(task);
        }}>
        <Icon icon={faCirclePlus} size={34} />
      </TouchableOpacity>
    </View>
  );
}

export default ProjectDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  addTaskButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginRight: 32,
  }
});
