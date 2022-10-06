import React, { useEffect, useState } from 'react';
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

import { useProjects } from '../providers/TaskProvider';
import { ScrollView } from 'react-native-gesture-handler';

const ProjectDetailScreen = (props) => {
  const { createTask, deleteItem} = useProjects();
  const project = props.route.params.project;
  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <View style={styles.projectBox}>
        <View>
          <Text>プロジェクト名: {project.name}</Text>
          <Text>説明: {project.decription}</Text>
        </View>
      </View>
      <ScrollView ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight)=> {
          scrollViewRef?.current?.scrollTo({y: contentHeight});
      }}>
        <SwipeListView
          data={project.tasks}
          keyExtractor={(item) => item._id.toHexString()}
          renderItem = {({item}) => (
            <View style={styles.taskBox}>
              <View>
                <Text>タスク名: {item.name}</Text>
                <Text>説明: {item.descriptioin}</Text>
              </View>
            </View>
          )}
          renderHiddenItem={ (data, rowMap) => (
            <TouchableOpacity onPress={()=>{deleteItem(data.item)}}>
              <View style={styles.swipeItem}>
                <Text>削除</Text>
              </View>
            </TouchableOpacity>
          )}
          rightOpenValue={-58}
          disableRightSwipe={true}
        />
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => {
            createTask(project);
          }}>
          <Icon icon={faCirclePlus} size={34} />
        </TouchableOpacity>
      </ScrollView>
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
  taskBox: {
    flexDirection: 'row',
    backgroundColor: '#00FF00',
    height: 64,
    marginTop: 18,
    marginStart: 48,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
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
