import { useState, useEffect, useRef } from 'react';
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
import { useProjects } from '../providers/TaskProvider';

const TimerScreen = (props) => {
  const work = props.route.params.work
  const { updateWork } = useProjects();
  const [time, setTime] = useState(0)
  const intervalId = useRef(null)
  const [inActionTimer, setInActionTimer] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)

  // workが存在しなければ作成する

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
      stopWatch(true)
    } else if (nextAppState === 'active') {
      // 保存していたタイマを読み出し
    }
  }

  const startWatch = () => {
    const startTime = new Date().getTime()
    intervalId.current = setInterval(() => {
      setTime(new Date().getTime() - startTime + time)
    }, 1000)
    setInActionTimer(true)
    updateWork(work, new Date(), null, true, null, null)
  }

  const stopWatch = (pause: boolean) => {
    console.log('stop: ' + intervalId.current)
    clearInterval(intervalId.current)
    intervalId.current = null
    setInActionTimer(false)
    updateWork(work, null, null, false, null, null)
  }

  const resetWatch = () => {
    setTime(0)
  }

  const saveWatch = () => {
    updateWork(work, null, new Date(), null, null, null)
    console.log('endTime')
    console.log(work)
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <WatchDisplay time={time} />
      </View>
      <View style={styles.play}>
        <TouchableWithoutFeedback onPress={() => {
          if (intervalId.current == null) {
            startWatch()
          } else {
            stopWatch(false)
          }
        }}>
          <Icon icon={faPlayCircle} size={102} style={{ display: inActionTimer ? 'none' : 'flex' }} />
          <Icon icon={faPauseCircle} size={102} style={{ display: inActionTimer ? 'flex' : 'none' }} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => {
          if (intervalId.current == null) {
            resetWatch()
          }
        }}
          activeOpacity={intervalId.current != null}
        >
          <Text style={[styles.button, { color: intervalId.current ? 'gray' : 'red' }]}>リセット</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (intervalId.current == null) {
            saveWatch() 
          }
        }}
          activeOpacity={intervalId.current != null}
        >
          <Text style={[styles.button, { marginTop: 32, color: intervalId.current ? 'gray' : 'blue' }]}>保存</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.exps}>
        <Text style={{ color: 'gray' }}>リセットボタンでタイマーのリセット</Text>
        <Text style={{ color: 'gray' }}>
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
