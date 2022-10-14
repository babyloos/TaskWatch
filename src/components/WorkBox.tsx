import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationState } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'

import colors from '../contants';
import { faPen } from '@fortawesome/free-solid-svg-icons';

type PropType = {
  navigation?: NavigationState;
  work: any;
  editable?: boolean;
};

const TaskBox = ({ navigation, work, editable}: PropType) => {
  const size = 12;
  const marginTop = 8;
  const marginBottom = 8;
  const gradColors = [colors.workBox.grad1, colors.workBox.grad2];

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
    width: '90%',
    marginLeft: 8,
  };
  const buttonFaceStyle = {
    borderRadius: size,
    padding: size,
  };

  return (
    <View style={{alignItems: 'flex-end', marginRight: 12}}>
      <View style={[styles.boxOuter, buttonCommonStyle, buttonOuterStyle]}>
        <View style={[styles.boxInner, buttonCommonStyle, buttonInnerStyle]}>
          <LinearGradient
            colors={gradColors}
            useAngle={true}
            angle={145}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={[styles.buttonFace, buttonFaceStyle]}>
          <View style={styles.infoArea}>
            <Text>2022/08/01 14:00 ~ 2022/08/01 15:00</Text>
            <Text style={{marginTop: 8}}>作業時間: 1h</Text>
          </View>
          <View style={styles.editArea}>
            <TouchableOpacity onPress={() => { navigation.navigate('WorkEdit', { work: work}) }}>
              <Icon icon={faPen} size={28} />
            </TouchableOpacity>
           </View>
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
    shadowColor: colors.workBox.shadow2,
    shadowOpacity: 1.0,
  },
  boxInner: {
    backgroundColor: colors.workBox.main,
    shadowColor: colors.workBox.shadow1,
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
  },
});
