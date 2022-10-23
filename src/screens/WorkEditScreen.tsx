import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faCalendarDay, faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons'

import { useProjects } from '../providers/TaskProvider'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { getDateFormated, toDispTime, toDispHour, toDispMinute } from '../utils/utils'

const WorkEditScreen = (props) => {
  // const { updateTask } = useProjects();
  // const task = props.route.params.task;
  const work = props.route.params.work
  // const [isShowDatePicker, setIsShowDatePicker] = useState(false)
  const [startDateTime, setStartDateTime] = useState(work.startTime)
  const [endDateTime, setEndDateTime] = useState(work.endTime)
  const [workTime, setWorkTime] = useState(work.workTime)
  // const [name, setName] = useState(task.name); 
  // const [description, setDescription] = useState(task.description); 
  
  const onChangeStartDate = (event: any, date: Date) => {
    setStartDateTime(date)
  }

  const onChangeStartTime = (event: any, time: Date) => {
    const settedDateTime = startDateTime
    settedDateTime.setTime(time.getTime())
    setStartDateTime(settedDateTime)
  }

  // TODO: setEndDateTime

  /*
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button 
          color={'#FF0000'}
          onPress={() => {
            updateTask(task, name, description);
            props.navigation.goBack();
         }} 
          title="保存"
        />
      ),
    });
    props.navigation.setOptions({title: name + ' - ' + '編集'});
  }, [updateTask, props.navigation, name, description]);
  */

  return (
    <TouchableWithoutFeedback 
      style={styles.container}
      onPress={() => {Keyboard.dismiss()}}
    >
      <View style={styles.dateInputContainer}>
        <Text style={styles.timeName}>開始時刻</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeInputContainer}>
            <DateTimePicker
              style={styles.dateTimePickerDate}
              mode='date'
              value={startDateTime}
              locale='ja-JP'
              is24Hour={true}
              onChange={onChangeStartDate}
              />
            <DateTimePicker
              style={styles.dateTimePickerTime}
              mode='time'
              value={startDateTime}
              locale='ja-JP'
              is24Hour={true}
              onChange={onChangeStartTime}
              />
          </View>
        </View>
      </View>
      <View style={styles.dateInputContainer}>
        <Text style={styles.timeName}>終了時刻</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeInputContainer}>
            <DateTimePicker
              style={styles.dateTimePickerDate}
              mode='date'
              value={endDateTime}
              locale='ja-JP'
              is24Hour={true}
              onChange={() => {console.log('changed')}}
              />
            <DateTimePicker
              style={styles.dateTimePickerTime}
              mode='time'
              value={endDateTime}
              locale='ja-JP'
              is24Hour={true}
              onChange={() => {console.log('changed')}}
              />
          </View>
        </View>
      </View>
      <View style={styles.dateInputContainer}>
        <Text style={styles.timeName}>作業時間</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeInputContainer}>
            <TextInput
              style={styles.workTimeInput}
              keyboardType='numeric'
              placeholder={toDispHour(workTime)}
              onChange={()=>{console.log('onChange')}}
              value={workTime}
              />
            <Text style={styles.workTimeUnit}>時間</Text>
          </View>
          <View style={[styles.timeInputContainer, {marginLeft: -20}]}>
            <TextInput
              style={styles.workTimeInput}
              keyboardType='decimal-pad'
              placeholder={toDispMinute(workTime)}
              value={workTime}
              />
            <Text style={styles.workTimeUnit}>分</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default WorkEditScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
  },
  dateInputContainer: {
    flexDirection: 'row',
    marginBottom: 38,
  },
  timeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
    flex: 0.5,
    alignSelf: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  timeInputContainer: {
    flexDirection: 'row',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  dateTimePickerDate: {
    width: '50%',
    marginRight: -10,
  },
  dateTimePickerTime: {
    width: '50%',
  },
  workTimeInput: {
    width: '50%',
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    textAlign: 'center',
  },
  workTimeUnit: {
    margin: 3,
    alignSelf: 'center',
    fontSize: 20,
  },
});
