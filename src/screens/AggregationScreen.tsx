import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'

import PickerModal from '../components/PickerModal'
import { useProjects } from '../providers/TaskProvider'
import colors from '../contants'

const AggregationScreen = () => {
  const { getMinStartDate, getMaxEndDate } = useProjects()
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

  // period
  const [startDate, setStartDate] = useState(new Date)
  const [endDate, setEndDate] = useState(new Date)

  useEffect(() => {
    const project = projects[selectedProject]
    setTaskList(getTaskNameList(project)) 
    setSelectedTask(0)
  }, [selectedProject])

  useEffect(() => {
    const project = projects[selectedProject]
    const task = project.tasks[selectedTask]
    const minDate = getMinStartDate(task)
    if (minDate) {
      setStartDate(minDate) 
    }
    const maxDate = getMaxEndDate(task)
    if (maxDate) {
      setEndDate(maxDate)
    }
  }, [selectedTask, selectedProject])

  return (
    <View style={styles.body}>
      <View style={styles.specifyItemContainer}>
        <View style={{marginBottom: 8}}>
          <Text>集計の対象</Text>
        </View>
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
      <View style={[styles.specifyItemContainer, {marginTop: 24}]}>
        <View style={{marginBottom: 8}}>
          <Text>集計する期間</Text>
        </View>
        <View style={styles.specifyItem}>
          <View style={styles.specifyItemName}><Text numberOfLines={1} style={styles.itemNameText}>開始</Text></View>
            <View style={styles.dateTimePickerContainer}>
              <DateTimePicker
                style={styles.dateTimePickerDate}
                mode='date'
                value={startDate}
                locale='ja-JP'
                is24Hour={true}
                onChange={()=>{console.log('change date')}}
              />
              <DateTimePicker
                style={styles.dateTimePickerDate}
                mode='time'
                value={startDate}
                locale='ja-JP'
                is24Hour={true}
                onChange={()=>{console.log('change date')}}
              />
            </View>
        </View>
        <View style={[styles.specifyItem, {marginTop: 18}]}>
          <View style={styles.specifyItemName}><Text numberOfLines={1} style={styles.itemNameText}>終了</Text></View>
            <View style={styles.dateTimePickerContainer}>
              <DateTimePicker
                style={styles.dateTimePickerDate}
                mode='date'
                value={endDate}
                locale='ja-JP'
                is24Hour={true}
                onChange={()=>{console.log('change date')}}
              />
              <DateTimePicker
                style={styles.dateTimePickerDate}
                mode='time'
                value={endDate}
                locale='ja-JP'
                is24Hour={true}
                onChange={()=>{console.log('change date')}}
              />
            </View>
        </View>
      </View>
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
    width: '40%',
  },
  itemNameText: {
    fontSize: 22,
    color: '#404040'
  },
  specifyItemValue: {
    backgroundColor: colors.selector.project,
    padding: 6,
    borderRadius: 6,
    width: '60%',
  },
  selectedItem: {
    fontSize: 22,
  },
  dateTimePickerContainer: {
    flexDirection: 'row',
    width: '60%',
  },
  dateTimePickerDate: {
    width: '50%',
  },
});
