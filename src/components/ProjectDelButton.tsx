import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ProjectDelButton = (props: any) => {

  return (
    <View style={styles.swipeItem}>
      <Text>{props.text}</Text>
    </View>
  );
};

export default ProjectDelButton;

const styles = StyleSheet.create({
  swipeItem: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginRight: 18,
    borderRadius: 12,
    width: 54,
    height: 64,
    backgroundColor: '#00FF00',
  },
});
