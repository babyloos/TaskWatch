import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useIsFocused } from '@react-navigation/native'

import TaskBox from '../components/TaskBox';
import WorkBox from '../components/WorkBox';
import DelButton from '../components/DelButton';
import { useProjects } from '../providers/TaskProvider';

const TaskDetailScreen = (props: any) => {
  const { deleteItem, delNullWorks, getTaskById, getProjectSpecifyTaskId, getProjectNo, getTaskNo} = useProjects()
  const task = getTaskById(props.route.params.taskId)
  const isFocused = useIsFocused()

  React.useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            const project = getProjectSpecifyTaskId(task._id)
            const projectNo = getProjectNo(project._id)
            const taskNo = getTaskNo(projectNo, task._id)
            props.navigation.navigate('Aggregation', { projectNo: projectNo, taskNo: taskNo});
          }}
          title="集計"
        />
      ),
      title: task.name
    });
  }, []);

  useEffect(() => {
    // endTimeの入っていないタスクを削除する
    if (isFocused) {
      delNullWorks(task)
    }
  }, [isFocused])

  useEffect(() => {
    props.navigation.setOptions({
      title: task.name
    })
  }, [task.name])

  return (
    <View style={styles.container}>
      <TaskBox navigation={props.navigation} task={task} editable={true} isDetail={true} showWatch={true} />
      <View style={{ marginLeft: 18 }}>
        <Text>作業履歴</Text>
      </View>
      <SwipeListView
        data={task.works}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <WorkBox navigation={props.navigation} work={item} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity onPress={
            () => {
              Alert.alert(
                '作業記録を削除しますか？',
                '',
                [
                  {
                    text: 'キャンセル',
                  },
                  {
                    text: '削除',
                    onPress: () => deleteItem(data.item),
                  }
                ]
              );
            }}>
            <DelButton text={'削除'} />
          </TouchableOpacity>
        )}
        rightOpenValue={-102}
        disableRightSwipe={true}
      />
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addTaskButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginRight: 32,
  }
});
