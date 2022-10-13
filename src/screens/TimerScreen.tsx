import {useState, useEffect, useRef} from 'react';
import { NavigationState } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AppState,
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
  const [time, setTime] = useState(0)
  const intervalId = useRef(null)
  const [inActionTimer, setInActionTimer] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      subscription.remove()
    }
   }, [])

  const _handleAppStateChange = (nextAppState: any) => {
    setAppState(nextAppState)

    // ここをactiveやinactiveに変えることでそれぞれの状態の時に発火できる
    if (nextAppState === 'inactive') {
      // TODO
      // inactive移行時に経過時間を保存
      stopWatch()
    } else if (nextAppState === 'active') {
      // 保存していたタイマを読み出し
    }
  }

  const startWatch = () => {
    const startTime = new Date().getTime()
    intervalId.current = setInterval(()=>{
      setTime(new Date().getTime() - startTime + time)
    }, 1000)
    console.log('start: ' + intervalId.current)
    setInActionTimer(true)
  }

  const stopWatch = () => {
    console.log('stop: ' + intervalId.current)
    clearInterval(intervalId.current)
    intervalId.current = null
    setInActionTimer(false)
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
          if (intervalId.current == null) {
            startWatch()
          } else {
            stopWatch()
          }
        }}>
          <Icon icon={faPlayCircle} size={102} style={{display: inActionTimer ? 'none' : 'flex'}}/>
          <Icon icon={faPauseCircle} size={102} style={{display: inActionTimer ? 'flex' : 'none'}}/>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>{
          if (intervalId.current == null) {
            resetWatch()
          }
        }}
          activeOpacity={intervalId.current != null}
        >
          <Text style={[styles.button, {color: intervalId.current ? 'gray' : 'red'}]}>リセット</Text>
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
