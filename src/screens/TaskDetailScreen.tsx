import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ScrollView } from 'react-native-gesture-handler';

import TaskBox from '../components/TaskBox';
import WorkBox from '../components/WorkBox';
import DelButton from '../components/DelButton';
import { useProjects } from '../providers/TaskProvider';

const TaskDetailScreen = (props: any) => {
  const { deleteItem } = useProjects();
  const task = props.route.params.task;

  return (
    <View style={styles.container}>
      <TaskBox navigation={props.navigation} task={task} editable={true} isDetail={true} showWatch={true}/>
      <View style={{marginLeft: 18}}>
        <Text>作業履歴</Text>
      </View>
      <SwipeListView
        data={task.works}
        keyExtractor={(item) => item._id.toHexString()}
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
