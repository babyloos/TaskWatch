import { useState, useEffect, useRef } from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AppState,
  Button,
  Alert,
} from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import WatchDisplay from '../components/WatchDisplay';
import { useProjects } from '../providers/TaskProvider';

const TimerScreen = (props) => {
  const work = props.route.params.work
  const { updateWork } = useProjects();
  const [time, setTime] = useState(work.workTime)
  const intervalId = useRef(null)
  const [inActionTimer, setInActionTimer] = useState<boolean>(work.inActive)
  const [appState, setAppState] = useState(AppState.currentState)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    if (appState === 'inactive') {
      // バックグランドへ移行
      stopWatch(false)
    } else if (appState === 'active') {
      // アクティブ状態へ移行
      if (work.inActive) {
        // workTime計算
        const workTime = work.workTime + (new Date() - work.pauseTime)
        // タイマー再始動
        startWatch(workTime)
      }
    }
  }, [appState])

  useEffect(() => {
    updateWork(work, null, null, inActionTimer, null, null)
    if (inActionTimer) {
      setIsStarted(true)
    }
  }, [inActionTimer])

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <Button
          title="戻る"
          onPress={() => {
            if (!work.isSaved && isStarted) {
              Alert.alert(
                '作業履歴が保存されていません',
                '保存せずに戻りますか？',
                [
                  {
                    text: 'いいえ', style: 'destructive', onPress: () => {
                      // 戻らない
                    }
                  },
                  {
                    text: 'はい', style: 'cancel', onPress: () => {
                      // 保存せずにもどる
                      props.navigation.goBack()
                    }
                  }
                ]
              )
            } else {
              // 作業が開始されていないので保存せず戻る
              props.navigation.goBack()
            }
          }}
        />
      ),
    })
  }, [props.navigation, work.isSaved, isStarted]);

  const _handleAppStateChange = (nextAppState: any) => {
    setAppState(nextAppState)
    return
  }

  const onPressStartWatch = () => {
    const now = new Date()
    startWatch(time)
    updateWork(work, now, null, true, null, null)
  }

  const startWatch = (initTime) => {
    const startTime = new Date()
    intervalId.current = setInterval(() => {
      const nowTime = (new Date().getTime() - startTime.getTime() + initTime)
      setTime(nowTime)
    }, 1000)
    setInActionTimer(true)
    setIsStarted(true)
  }

  const stopWatch = (onPressButton: boolean) => {
    clearInterval(intervalId.current)
    intervalId.current = null
    if (onPressButton) {
      // ボタン押下による停止
      setInActionTimer(false)
      updateWork(work, null, null, null, null, time)
    } else {
      // バックグラウンド移行による停止
      updateWork(work, null, null, null, new Date(), time)
    }
  }

  const resetWatch = () => {
    setTime(0)
    updateWork(work, null, null, false, null, null)
  }

  const saveWatch = () => {
    updateWork(work, null, new Date(), null, null, time, true)
    // props.navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <WatchDisplay time={time} />
      </View>
      <View style={styles.play}>
        <TouchableWithoutFeedback onPress={() => {
          if (!inActionTimer) {
            onPressStartWatch()
          } else {
            stopWatch(true)
          }
        }}>
          <Icon icon={faPlayCircle} size={102} style={{ display: inActionTimer ? 'none' : 'flex' }} />
          <Icon icon={faPauseCircle} size={102} style={{ display: inActionTimer ? 'flex' : 'none' }} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => {
          if (!inActionTimer && isStarted) {
            resetWatch()
          }
        }}
          activeOpacity={intervalId.current != null}
        >
          <Text style={[styles.button, { color: !inActionTimer && isStarted ? 'red' : 'gray' }]}>リセット</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (!inActionTimer && isStarted) {
            saveWatch()
          }
        }}
          activeOpacity={intervalId.current != null && isStarted}
        >
          <Text style={[styles.button, { marginTop: 32, color: !inActionTimer && isStarted ? 'blue' : 'gray' }]}>保存</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.exps}>
        <Text style={{ color: 'gray' }}>リセットボタンでタイマーのリセット</Text>
        <Text style={{ color: 'gray' }}>
          保存ボタンを押すと経過時間が保存され、タスク詳細画面へ戻ります。
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
