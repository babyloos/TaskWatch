import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProjectDelButton = (props: any) => {

  const size = 12;
  const marginTop = 18;
  const marginBottom = 8;
  const gradColors = ['#ff0000', '#d90000'];

  const buttonCommonStyle = {
    borderRadius: size,
    shadowRadius: size / 2,
  };
  const buttonOuterStyle = {
    shadowOffset: { width: size / 3, height: size / 2.5 },
    marginTop: marginTop,
    marginBottom: marginBottom,
  };
  const buttonInnerStyle = {
    shadowOffset: { width: -size / 3, height: -size / 2.5 },
    marginLeft: 8,
    marginTop: size,
  };
  const buttonFaceStyle = {
    borderRadius: size,
    padding: size * 1.5,
  };

  return (
    <View style={[styles.button, buttonCommonStyle, buttonOuterStyle]}>
      <View style={[styles.inner, buttonCommonStyle, buttonInnerStyle]}>
        <LinearGradient
          colors={gradColors}
          useAngle={true}
          angle={145}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={[styles.face, buttonFaceStyle]}>
          <Text style={styles.textStyle}>{props.text}</Text>
        </LinearGradient>
      </View>
    </View >
  );
};

export default ProjectDelButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#5293d0',
    shadowOpacity: 1.0,
    marginRight: 24,
  },
  outer: {
    flexDirection: 'row',
    minHeight: 64,
    borderRadius: 12,
    padding: 8,
    shadowColor: '#5293d0',
    shadowOpacity: 1.0,
  },
  inner: {
    backgroundColor: '#61adf5',
    shadowColor: '#70c7ff',
    shadowOpacity: 0.5,
  },
  face: {
    padding: 12,
    borderRadius: 12,
  },
  textStyle: {
    fontWeight: 'bold',
  }
});
