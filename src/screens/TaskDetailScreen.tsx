import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ScrollView } from 'react-native-gesture-handler';

import ProjectBox from '../components/ProjectBox';
import TaskBox from '../components/TaskBox';
import WorkBox from '../components/WorkBox';
import { useProjects } from '../providers/TaskProvider';
import DelButton from '../components/DelButton';

const TaskDetailScreen = (props: any) => {
  const { createTask, deleteItem } = useProjects();
  const task = props.route.params.task;
  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <TaskBox navigation={props.navigation} task={task} editable={true} isDetail={true} showWatch={true}/>
      <SwipeListView
        data={task.works}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={({ item }) => (
          <WorkBox navigation={props.navigation} work={item} />
        )}
      />
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeItem: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginEnd: 32,
    borderRadius: 12,
    width: 50,
    height: 64,
    backgroundColor: '#00FF00',
  },
  addTaskButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginRight: 32,
  }
});
