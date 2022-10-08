import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../contants';

const TaskBox = (task: any) => {

  const size = 12;
  const marginTop = 8;
  const marginBottom = 8;
  const gradColors = [colors.taskBox.grad1, colors.taskBox.grad2];

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

  return (
    <View style={{ alignItems: "flex-end", marginRight: 12 }}>
      <View style={[styles.boxOuter, buttonCommonStyle, buttonOuterStyle]}>
        <View style={[styles.boxInner, buttonCommonStyle, buttonInnerStyle]}>
          <LinearGradient
            colors={gradColors}
            useAngle={true}
            angle={145}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={[styles.buttonFace, buttonFaceStyle]}>
            <Text>タスク名: {task.name}</Text>
            <Text>説明: {task.descriptioin}</Text>
            <Text>合計時間: 10h</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
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
    flexDirection: 'column',
  },
  infoArea: {
    flexDirection: 'column',
    flex: 0.9,
  },
  editArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
