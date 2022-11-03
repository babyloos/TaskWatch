import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { BarChart } from "react-native-chart-kit";

import PickerModal from '../components/PickerModal'
import { useProjects } from '../providers/TaskProvider'
import colors from '../contants'
import { toDispTime } from '../utils/utils'

const AggregationScreen = (props) => {

  // props
  const project = props.route.params.project
  const task = props.route.params.task

  const { getMinStartDate, getMaxEndDate, getTaskTotalTime } = useProjects()
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

  useEffect(() => {
    if (project) {
      const projectName = project.name
      for (var i=0; i<projects.length; i++) {
        if (projects[i].name === projectName) {
          setSelectedProjcet(i)
        }
      }
    }
    if (task) {
      const taskName = task.name
      for (var i=0; i<project.tasks.length; i++) {
        if (project.tasks[i].name === taskName) {
          setSelectedTask(i)
        }
      }
    }
  }, [project, task])

  // Tasks
  const [taskList, setTaskList] = useState([''])
  const [isShowTaskPicker, setIsShowTaskPicker] = useState(false)
  const [selectedTask, setSelectedTask] = useState(0)
  const [totalWorkTime, setTotalWorkTime] = useState(0)

  // period
  const [startDate, setStartDate] = useState(new Date)
  const [endDate, setEndDate] = useState(new Date)

  // chart
  const [chartLabels, setChartLabels] = useState([''])
  const [chartDatas, setChartDatas] = useState([0])
  const [yAxisSuffix, setYAxisSuffix] = useState('時間')

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

  useEffect(() => {
    updateTotalTime()
  }, [selectedTask, selectedProject, startDate, endDate])

  const updateTotalTime = () => {
    const project = projects[selectedProject]
    const task = project.tasks[selectedTask]
    var totalTime = 0 
    if (task) {
      totalTime = calcTotalTaskTime(task, startDate, endDate)
    }
    setTotalWorkTime(totalTime)
    createChartData()
  }

  const calcTotalTaskTime = (task: any, startTime: Date, endTime: Date): number => {
    const works = task.works
    var totalTime = 0       // ms
    for (var i=0; i<works.length; i++) {
      const work = works[i]
      if (work.startTime >= startTime && work.endTime <= endTime) {
        totalTime += work.workTime
      }
    }
    return totalTime
  }

  // update aggregation period
  const onChangeStartDate = (event: any, date: Date) => {
    const settedDate = startDate
    settedDate.setFullYear(date.getFullYear())
    settedDate.setMonth(date.getMonth())
    settedDate.setDate(date.getDate())
    setStartDate(settedDate)
    updateTotalTime()
  }

  const onChangeStartTime = (event: any, time: Date) => {
    const settedDate = startDate
    settedDate.setTime(time.getTime())
    setStartDate(settedDate)
    updateTotalTime()
  }

  const onChangeEndDate = (event: any, date: Date) => {
    const settedDate = endDate
    settedDate.setFullYear(date.getFullYear())
    settedDate.setMonth(date.getMonth())
    settedDate.setDate(date.getDate())
    setEndDate(settedDate)
    updateTotalTime()
  }

  const onChangeEndTime = (event: any, time: Date) => {
    const settedDate = endDate
    settedDate.setTime(time.getTime())
    setEndDate(settedDate)
    updateTotalTime()
  }

  const createChartData = () => {
    // 開始日時、終了日時から期間を計算
    const startDateTmp = new Date(startDate.getTime())
    startDateTmp.setMilliseconds(0)
    const endDateTmp = new Date(endDate.getTime())
    endDateTmp.setMilliseconds(0)
    const periodTime = endDateTmp - startDateTmp 
    var period = 2; // 0: 7日以内, 1: 7ヶ月以内, 2: 8ヶ月以上
    if (periodTime <= 7 * 86400000) {
      period = 0
    } else if (periodTime <= 7 * 31 * 86400000) {
      period = 1
    }

    // labels
    var labels = ['', '', '', '', '', '', '']
    var startLabel = ''
    var endLabel = ''
    const startYear = startDateTmp.getFullYear() + '年'
    const startMonth = startDateTmp.getMonth() + 1 + '月'
    const startDateLabel = startDateTmp.getDate() + '日'
    const endYear = endDateTmp.getFullYear() + '年'
    const endMonth = endDateTmp.getMonth() + 1 + '月'
    const endDateLabel = endDateTmp.getDate() + '日'
    switch(period) {
      case 0: // 月日
        startLabel = startMonth + startDateLabel
        endLabel = endMonth + endDateLabel
        break
      case 1: // 年月
        startLabel = startYear + startMonth
        endLabel = endYear + endMonth
        break
      case 2: // 年
        startLabel = startYear
        endLabel = endYear
    }
    labels[0] = startLabel
    labels[5] = '           ' + endLabel    // 表示位置がずれるので一個手前に表示する

    // datas
    var datas = []
    const project = projects[selectedProject]
    const task = project.tasks[selectedTask]
    let periodStart = new Date(startDateTmp.getTime())
    let workTime = 0
    switch(period) {
      case 0:
        // 日毎
        for (var i=0; i<7; i++) {
          var periodEnd = new Date(periodStart.getTime())
          periodEnd.setDate(periodEnd.getDate() + 1)
          if (periodEnd > endDate) {
            continue
          }
          workTime = getTaskTotalTime(task, periodStart, periodEnd)
          datas.push(workTime)
          periodStart.setDate(periodStart.getDate() + 1)
        }
        break
      case 1:
        // 月毎
        for (var i=0; i<7; i++) {
          var periodEnd = new Date(periodStart.getTime())
          periodEnd.setMonth(periodEnd.getMonth() + 1)
          if (periodEnd > endDate) {
            continue
          }
          workTime = getTaskTotalTime(task, periodStart, periodEnd)
          datas.push(workTime)
          periodStart.setMonth(periodStart.getMonth() + 1)
        }
      case 2:
        // 年毎
        for (var i=0; i<7; i++) {
          var periodEnd = new Date(periodStart.getTime())
          periodEnd.setYear(periodEnd.getFullYear() + 1)
          if (periodEnd > endDate) {
            continue
          }
          workTime = getTaskTotalTime(task, periodStart, periodEnd)
          datas.push(workTime)
          periodStart.setFullYear(periodStart.getFullYear() + 1)
        }
    }
    // 最大作業時間によって縦軸の単位を変える
    const aryMax = function (a: number, b: number) {return Math.max(a, b);}
    if (datas.length > 0) {
      if (datas.reduce(aryMax) <= 3600000) {
        datas = datas.map(d => d / 60000)
        setYAxisSuffix('分')
      } else if (datas.reduce(aryMax) <= 24 * 3600000) {
        datas = datas.map(d => d / 3600000)
        setYAxisSuffix('時間')
      }
    }
    setChartLabels(labels)
    setChartDatas(datas)
  }

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
                onChange={onChangeStartDate}
              />
              <DateTimePicker
                style={styles.dateTimePickerDate}
                mode='time'
                value={startDate}
                locale='ja-JP'
                is24Hour={true}
                onChange={onChangeStartTime}
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
                onChange={onChangeEndDate}
              />
              <DateTimePicker
                style={styles.dateTimePickerDate}
                mode='time'
                value={endDate}
                locale='ja-JP'
                is24Hour={true}
                onChange={onChangeEndTime}
              />
            </View>
        </View>
        <View style={styles.totalWorkTimeContainer}>
          <Text style={styles.totalWorkTimeName}>総作業時間</Text>
          <Text style={styles.totalWorkTimeValue}>{toDispTime(totalWorkTime)}</Text>
        </View>
        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: chartLabels,
              datasets: [
                {
                  data: chartDatas,
                }
              ]
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix={yAxisSuffix}
            yAxisInterval={1} // optional, defaults to 1
            fromZero={true}
            chartConfig={{
              backgroundColor: colors.graph.background,
              backgroundGradientFrom: colors.graph.gradientFrom,
              backgroundGradientTo: colors.graph.gradientTo,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{
              marginTop: 24,
              borderRadius: 8, 
            }}
          />
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
  totalWorkTimeContainer: {
    marginTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalWorkTimeName: {
    fontSize: 24,
    width: '50%',
    textAlign: 'center',
  },
  totalWorkTimeValue: {
    fontSize: 24,
    width: '50%',
    textAlign: 'center',
  },
  chartContainer: {

  }
});
