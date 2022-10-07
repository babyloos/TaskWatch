import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationState } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type PropType = {
  navigation: NavigationState;
  task: any;
};

const ProjectBox = ({ navigation, project }: PropType) => {

  const size = 12;
  const marginTop = 8;
  const marginBottom = 8;
  const gradColors = ['#67b9ff', '#579cdd'];

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
    width: '95%',
    marginLeft: 8,
  };
  const buttonFaceStyle = {
    borderRadius: size,
    padding: size,
  };

  return (
    <View style={[styles.projectBox, buttonCommonStyle, buttonOuterStyle]}>
      <View style={[styles.boxInner, buttonCommonStyle, buttonInnerStyle]}>
        <LinearGradient
          colors={gradColors}
          useAngle={true}
          angle={145}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={[styles.buttonFace, buttonFaceStyle]}>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>プロジェクト名: {project.name}</Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>説明: {project.description}</Text>
          <Text>タスク数: </Text>
        </LinearGradient>
      </View>
    </View>
  );
}

export default ProjectBox;

const styles = StyleSheet.create({
  projectBox: {
    flexDirection: 'row',
    minHeight: 64,
    borderRadius: 12,
    padding: 8,
    shadowColor: '#5293d0',
    shadowOpacity: 1.0,
  },
  boxInner: {
    backgroundColor: '#61adf5',
    shadowColor: '#70c7ff',
    shadowOpacity: 0.5,
  },
  buttonFace: {
    padding: 12,
    borderRadius: 12,
  }
});
