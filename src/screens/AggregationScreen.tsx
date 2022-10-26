import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

import PickerModal from '../components/PickerModal'
import { useProjects } from '../providers/TaskProvider'
import colors from '../contants'

const AggregationScreen = () => {
  const getProjectNameList = (projects: any): Array<string> => {
    let result = new Array<string>()
    for (var i=0; i<projects.length; i++) {
      result.push(projects[i].name)
    }
    return result
  }

  const getTaskNameList = (project: any): Array<string> => {
    let result = new Array<string>()
    for (var i=0; i<project.tasks.length; i++) {
      result.push(project.tasks[i].name)
    }
    return result
  }

  // Projects
  const { projects } = useProjects()
  const projectList = getProjectNameList(projects)
  const [isShowProjectPicker, setIsShowProjectPicker] = useState(false)
  const [selectedProject, setSelectedProjcet] = useState(0)

  // Tasks
  const [taskList, setTaskList] = useState([''])
  const [isShowTaskPicker, setIsShowTaskPicker] = useState(false)
  const [selectedTask, setSelectedTask] = useState(0)

  useEffect(() => {
    const project = projects[selectedProject]
    setTaskList(getTaskNameList(project)) 
    setSelectedTask(0)
  }, [selectedProject])

  return (
    <View style={styles.body}>
      <View style={styles.specifyItemContainer}>
        <View style={styles.specifyItem}>
          <View style={styles.specifyItemName}><Text numberOfLines={1} style={styles.itemNameText}>プロジェクト</Text></View>
          <View style={styles.specifyItemValue}>
            <TouchableOpacity onPress={() => {
              setIsShowProjectPicker(true)
            }}>
              <Text 
                numberOfLines={1}
                style={styles.selectedItem}>{projectList[selectedProject]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PickerModal
        isShowPicker={isShowProjectPicker} setIsShowPicker={setIsShowProjectPicker}
        selectedItem={selectedProject} setSelectedItem={setSelectedProjcet}
        items={projectList}
      />
      <View style={[styles.specifyItemContainer, {marginTop: 24}]}>
        <View style={styles.specifyItem}>
          <View style={styles.specifyItemName}><Text numberOfLines={1} style={styles.itemNameText}>タスク</Text></View>
          <View style={styles.specifyItemValue}>
            <TouchableOpacity onPress={() => {
              if (taskList.length > 0) {
                setIsShowTaskPicker(true)
              }
            }}>
              <Text 
                numberOfLines={1}
                style={styles.selectedItem}>{!taskList[selectedTask] ? 'タスクなし' : taskList[selectedTask]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PickerModal
        isShowPicker={isShowTaskPicker} setIsShowPicker={setIsShowTaskPicker}
        selectedItem={selectedTask} setSelectedItem={setSelectedTask}
        items={taskList}
      />
    </View>
  )
}

export default AggregationScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    margin: 18,
  },
  specifyItemContainer: {
    flexDirection: 'column',
  },
  specifyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specifyItemName: {
    textAlign: 'center',
    width: '40%',
  },
  itemNameText: {
    fontSize: 24,
    color: '#404040'
  },
  specifyItemValue: {
    backgroundColor: colors.selector.project,
    padding: 6,
    borderRadius: 6,
    width: '60%',
  },
  selectedItem: {
    fontSize: 24,
  }
});
