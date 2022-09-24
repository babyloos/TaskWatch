import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ProjectBox = () => {

  return (
    <View>
      <View style={styles.projectBox}>
        <Text>Project Name : Project Name</Text>
        <Text>Project Detail</Text>
        <Text>No of Task</Text>
        <Text>Total work time: ....</Text>
      </View>
      <View style={styles.taskBox}>
        <Text>Project Name</Text>
        <Text>Project Detail</Text>
        <Text>No of Task</Text>
        <Text>Total work time: ....</Text>
      </View>
      <View style={styles.taskBox}>
        <Text>Project Name</Text>
        <Text>Project Detail</Text>
        <Text>No of Task</Text>
        <Text>Total work time: ....</Text>
      </View>
    </View>
  );
}

export default ProjectBox;

const styles = StyleSheet.create({
  projectBox: {
    backgroundColor: '#FF0000',
    marginTop: 18,
    marginStart: 12,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  },
  taskBox: {
    backgroundColor: '#00FFFF',
    marginTop: 12,
    marginStart: 24,
    marginEnd: 32,
    borderRadius: 12,
    padding: 8,
  }
});
