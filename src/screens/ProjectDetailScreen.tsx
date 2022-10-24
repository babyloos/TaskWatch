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

import ProjectBox from '../components/ProjectBox';
import TaskBox from '../components/TaskBox';
import { useProjects } from '../providers/TaskProvider';
import DelButton from '../components/DelButton';

const ProjectDetailScreen = (props) => {
  const { createTask, deleteItem } = useProjects()
  const project = props.route.params.project
  var listRef = React.useRef(null)

  return (
    <View style={styles.container}>
      <ProjectBox navigation={props.navigation} project={project} isDetail={true} />
      <SwipeListView
        listViewRef={(ref) => { listRef.current = ref }}
        onContentSizeChange={(width, height) => {
          listRef?.current?.scrollToOffset({
            animated: true,
            offset: height
          })
        }}
        data={project.tasks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('TaskDetail', { title: item.name, task: item })
            }}
          >
            <TaskBox navigation={props.navigation} task={item} editable={false} showWatch={false} />
          </TouchableOpacity>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity onPress={
            () => {
              Alert.alert(
                data.item.name + ' を削除しますか？',
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
      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => {
          createTask(project);
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
  addTaskButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginBottom: 16,
    marginRight: 32,
  }
});
