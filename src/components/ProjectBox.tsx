import React, { useState, useEffect, isValidElement } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DropDownMenu from './dropdownMenu';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faClock} from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

type task = {
  id: number,
  project_id: number,
  name: string, 
  explanation: string,
  totalTime: number,
}

const ProjectBox = () => {
  const [taskList, setTaskList] = useState<task[]>([]);
  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <ScrollView ref={scrollViewRef}
      onContentSizeChange={(contentWidth, contentHeight)=> {
        scrollViewRef?.current?.scrollTo({y: contentHeight});
      }}>
      <View style={styles.projectBox}>
        <Text>プロジェクト1</Text>
        <Text>説明文...</Text>
        <Text>タスク数: 18</Text>
        <Text>総作業時間: 20時間18分</Text>
      </View>
      <View>
        {
          taskList.map(
            data => {
              return (
                <View style={styles.taskBox}>
                  <View style={styles.infos}>
                    <Text>{data.name}</Text>
                    <Text>{data.explanation}</Text>
                    <Text>合計時間{data.totalTime}時間</Text>
                  </View>
                  <View style={styles.menus}>
                    <Icon icon={faClock} size={38} style={{marginRight: 18}} />
                    <DropDownMenu/>
                  </View>
                </View>
              );
            }
          )
        }
      </View>
      <View>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => {
            const addTask = {
              id: 0,
              project_id: 0,
              name: 'タスク名',
              explanation: '説明文...',
              totalTime: 10,
            }
            setTaskList([...taskList, addTask]);
          }}>
        <Icon icon={faCirclePlus} size={32} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProjectBox;

const styles = StyleSheet.create({
  projectBox: {
    backgroundColor: '#FF0000',
    marginTop: 18,
    marginStart: 12,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  },
  taskBox: {
    flexDirection: 'row',
    backgroundColor: '#00FFFF',
    marginTop: 12,
    marginStart: 24,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  },
  infos: {
    flex: 0.7,
  },
  menus: { 
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  addTaskButton: {
    alignItems: 'flex-end',
    marginTop: 32,
    marginRight: 38,
  } 
});
