import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationState } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import colors from '../contants';
import { useProjects } from '../providers/TaskProvider';
import { toDispTime } from '../utils/utils'

type PropType = {
  navigation?: NavigationState;
  task: any;
  editable?: boolean;
  isDetail?: boolean;
  showWatch?: boolean;
};

const TaskBox = ({ navigation, task, editable, isDetail = false, showWatch = false }: PropType) => {
  const { createWork, getResentWork, getTaskTotalTime } = useProjects();
  const size = 12;
  const marginTop = 8;
  const marginBottom = 8;
  const gradColors = [colors.taskBox.grad1, colors.taskBox.grad2];
  const [totalTime, setTotalTime] = useState(0)

  const buttonCommonStyle = {
    borderRadius: size,
    shadowRadius: size / 2,
  };
  const buttonOuterStyle = {
    shadowOffset: { width: size / 4, height: size / 4 },
    marginTop: marginTop,
    marginBottom: marginBottom,
  };
  const buttonInnerStyle = {
    shadowOffset: { width: -size / 4, height: -size / 4 },
    width: '80%',
    marginLeft: 8,
  };
  const buttonFaceStyle = {
    borderRadius: size,
    padding: size,
  };

  const alignItems = isDetail ? 'center' : 'flex-end';
  const marginRight = isDetail ? 0 : 12;
  const width = isDetail ? '95%' : '80%';
  const marginLeft = isDetail ? 0 : 8;

  useEffect(() => {
    const time = getTaskTotalTime(task)
    setTotalTime(time)
  }, [task.works])

  return (
    <View style={{ alignItems: alignItems, marginRight: marginRight }}>
      <View style={[styles.boxOuter, buttonCommonStyle, buttonOuterStyle]}>
        <View style={[styles.boxInner, buttonCommonStyle, buttonInnerStyle, { width: width, marginLeft: marginLeft }]}>
          <LinearGradient
            colors={gradColors}
            useAngle={true}
            angle={145}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={[styles.buttonFace, buttonFaceStyle]}>
            <View style={styles.infoArea}>
              <Text numberOfLines={isDetail ? undefined : 1} style={{ fontWeight: 'bold', fontSize: 18 }}>{task.name}</Text>
              <Text numberOfLines={isDetail ? undefined : 1} style={{ fontSize: 16, marginTop: 6 }}>{task.description}</Text>
              <Text numberOfLines={isDetail ? undefined : 1} style={{ fontSize: 16, marginTop: 6 }}>????????????: {toDispTime(totalTime)}</Text>
            </View>
            <View
              style={[styles.editArea, { display: editable || showWatch ? 'flex' : 'none' }]}>
              <View style={{ display: editable ? 'flex' : 'none' }}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('TaskEdit', { task: task }) }}>
                  <Icon icon={faPen} size={28} />
                </TouchableOpacity>
              </View>
              <View style={{ display: showWatch ? 'flex' : 'none', marginTop: 24 }}>
                <TouchableOpacity
                  onPress={() => {
                    createWork(task)
                    navigation.navigate('Timer', {title: task.name})
                  }}>
                  <Icon icon={faClock} size={32} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View >
    </View >
  );
};

export default TaskBox;

const styles = StyleSheet.create({
  boxOuter: {
    flexDirection: 'row',
    minHeight: 64,
    borderRadius: 12,
    padding: 8,
    shadowColor: colors.taskBox.shadow2,
    shadowOpacity: 1.0,
  },
  boxInner: {
    backgroundColor: colors.taskBox.main,
    shadowColor: colors.taskBox.shadow1,
    shadowOpacity: 0.5,
  },
  buttonFace: {
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
  },
  infoArea: {
    flex: 1,
    flexDirection: 'column',
  },
  editArea: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 8,
    flex: 0.1,
  },
});
