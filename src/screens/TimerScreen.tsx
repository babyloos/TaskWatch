import {useState} from 'react';
import { NavigationState } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import WatchDisplay from '../components/WatchDisplay';

type PropType = {
  navigation: NavigationState;
  task: any;
};

const TimerScreen = ({navigation, task}: PropType) => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startWatch = () => {
    const startTime = new Date().getTime();
    const id = setInterval(() => {
      setTime(new Date().getTime() - startTime + time)
    }, 10);
    setIntervalId(id);
  }

  const stopWatch = () => {
    clearInterval(intervalId)
    setIntervalId(null)
  }

  const resetWatch = () => {
    setTime(0)
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <WatchDisplay time={time}/>
      </View>
      <View style={styles.play}>
        <TouchableWithoutFeedback onPress={() => {
          if (intervalId == null) {
            startWatch()
          } else {
            stopWatch()
          }
        }}>
          <Icon icon={faPlayCircle} size={102} style={{display: intervalId ? 'none' : 'flex'}}/>
          <Icon icon={faPauseCircle} size={102} style={{display: intervalId ? 'flex' : 'none'}}/>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>{
          if (intervalId == null) {
            resetWatch()
          }
        }}
          activeOpacity={intervalId != null}
        >
          <Text style={[styles.button, {color: intervalId ? 'gray' : 'red'}]}>リセット</Text>
        </TouchableOpacity>
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
