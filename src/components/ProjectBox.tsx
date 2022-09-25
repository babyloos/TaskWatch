import React, { useState, useEffect, isValidElement } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';

type task = {
  id: number,
  project_id: number,
  name: string, 
  explanation: string,
  totalTime: 10,
}

const ProjectBox = () => {

  const [taskList, setTaskList] = useState<task[]>([]);
  return (
    <ScrollView>
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
                  <Text>{data.name}</Text>
                  <Text>{data.explanation}</Text>
                  <Text>合計時間{data.totalTime}時間</Text>
                </View>
              );
            }
          )
        }
      </View>
      <View>
        <Button
          title="追加" 
          onPress={() => {
            const addTask = {
              id: 0,
              project_id: 0,
              name: 'タスク名',
              explanation: '説明文...',
              totalTime: 10,
            }
            setTaskList([...taskList, addTask]);
            console.log(taskList);
          }}/>
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
    backgroundColor: '#00FFFF',
    marginTop: 12,
    marginStart: 24,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  }
});
