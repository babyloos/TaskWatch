import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WatchDisplay = ({ time }: any) => {

  const formatDisplay = (number: number): string => {
    var result = number.toString()
    if (number < 10) {
      result = '0' + number
    }
    return result
  }

  return (
    <View style={styles.displayContainer}>
      <Text style={styles.timer}>{formatDisplay(Math.floor(time / (3600 * 1000)))}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.timer}>{formatDisplay(Math.floor((time / 1000 % 3600) / 60))}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.timer}>{formatDisplay(Math.floor(time / 1000 % 60))}</Text>
    </View>
  )
}

export default WatchDisplay;

const styles = StyleSheet.create({
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    width: 100,
    fontSize: 70,
    fontWeight: 'bold',
    fontFamily: 'Hiragino Kaku Gothic ProN',
  },
  colon: {
    width: 20,
    fontSize: 80,
  }
});
