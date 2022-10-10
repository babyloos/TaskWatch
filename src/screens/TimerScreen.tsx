import { NavigationState } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

type PropType = {
  navigation: NavigationState;
  task: any;
};

const TimerScreen = ({navigation, task}: PropType) => {
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerDisp}>00:25:32</Text>
      </View>
      <View style={styles.play}>
        <Icon icon={faPlayCircle} size={102}/>
      </View>
      <View style={styles.buttons}>
        <Text style={[styles.button, {color: 'red'}]}>リセット</Text>
        <Text style={[styles.button, {marginTop: 32, color: 'blue'}]}>保存</Text>
      </View>
      <View style={styles.exps}>
        <Text style={{color: 'gray'}}>リセットボタンでタイマーのリセット</Text>
        <Text style={{color: 'gray'}}>
          保存ボタンを押すと経過時間が保存され、タイマーがリセットされます。
        </Text>
      </View>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 12,
  },
  timerContainer: {
    marginTop: 32,
  },
  timerDisp: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  play: {
    marginTop: 48,
  },
  buttons: {
    marginTop: 64,
    alignItems: 'center',
  },
  button: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  exps: {
    marginTop: 32,
    alignItems: 'center',
  }
});
