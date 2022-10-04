import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TouchableWithoutFeedbackComponent, TouchableNativeFeedback } from 'react-native';
import ProjectBox from '../components/ProjectBox';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

import { useTasks } from '../providers/TaskProvider';

const TaskListScreen = ({ navigation }) => {
  const { createTask, deleteTask, setIsTaskDone, tasks } = useTasks();

  return (
    <View style={styles.body}>
      <SwipeListView
        style={styles.projectBoxContainer}
        data={tasks}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem = {({item}) => (
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=>{
              navigation.navigate('ProjectDetail', {title: item.name});
            }}>
            <ProjectBox navigation={navigation} task={item}/>
          </TouchableOpacity>
        )}
        renderHiddenItem={ (data, rowMap) => (
          <View style={{
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 18,
            marginEnd: 32,
            borderRadius: 12,
            width: 50,
            height: 50,
            backgroundColor: '#00FF00',
          }}>
            <TouchableOpacity>
              <Text>削除</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-58}
        disableRightSwipe={true}
        />
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
