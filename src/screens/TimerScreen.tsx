import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const TimerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TimerScreen</Text>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
