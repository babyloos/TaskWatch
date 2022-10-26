import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

import { useProjects } from '../providers/TaskProvider'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { toDispHour, toDispMinute } from '../utils/utils'

const WorkEditScreen = (props: any) => {
  const { updateWork } = useProjects();
  const work = props.route.params.work
  const [startDateTime, setStartDateTime] = useState(work.startTime)
  const [endDateTime, setEndDateTime] = useState(work.endTime)
  const [workTime] = useState(work.workTime)
  const [workTimeHour, setWorkTimeHour] = useState(parseInt(toDispHour(workTime)))
  const [workTimeMinute, setWorkTimeMinute] = useState(parseInt(toDispMinute(workTime)))

  const onChangeStartDate = (event: any, date: Date) => {
    const settedDateTime = startDateTime
    settedDateTime.setDate(date.getDate())
    setStartDateTime(settedDateTime)
  }

  const onChangeStartTime = (event: any, time: Date) => {
    const settedDateTime = startDateTime
    settedDateTime.setTime(time.getTime())
    setStartDateTime(settedDateTime)
  }

  const onChangeEndDate = (event: any, date: Date) => {
    const settedDateTime = endDateTime
    settedDateTime.setDate(date.getDate())
    setEndDateTime(settedDateTime)
  }

  const onChangeEndTime = (event: any, time: Date) => {
    const settedDateTime = endDateTime
    settedDateTime.setTime(time.getTime())
    setEndDateTime(settedDateTime)
  }

  const onChangeWorkHour = (input: string) => {
    const inputNum = parseInt(input.replace(/[^0-9]/g, ''), 10)
    setWorkTimeHour(inputNum)
  }

  const onChangeWorkMinute = (input: string) => {
    const inputNum = parseInt(input.replace(/[^0-9]/g, ''), 10)
    setWorkTimeMinute(inputNum)
  }

  const saveWork = () => {
    const workTime = workTimeHour * 3600 * 1000 + workTimeMinute * 60 * 1000
    updateWork(work, startDateTime, endDateTime, null, null, workTime, null);
  }

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          color={'#FF0000'}
          onPress={() => {
            saveWork()
            props.navigation.goBack();
          }}
          title="保存"
        />
      ),
    });
  })

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => { Keyboard.dismiss() }}
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
              onChange={onChangeEndDate}
            />
            <DateTimePicker
              style={styles.dateTimePickerTime}
              mode='time'
              value={endDateTime}
              locale='ja-JP'
              is24Hour={true}
              onChange={onChangeEndTime}
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
              keyboardType='decimal-pad'
              placeholder={toDispHour(workTime)}
              placeholderTextColor='#808080'
              onChangeText={(input: string) => { onChangeWorkHour(input) }}
            />
            <Text style={styles.workTimeUnit}>時間</Text>
          </View>
          <View style={[styles.timeInputContainer, { marginLeft: -20 }]}>
            <TextInput
              style={styles.workTimeInput}
              keyboardType='decimal-pad'
              placeholder={toDispMinute(workTime)}
              placeholderTextColor='#808080'
              onChangeText={(input: string) => { onChangeWorkMinute(input) }}
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
    marginTop: '40%',
    flexDirection: 'column',
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
