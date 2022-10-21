import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationState } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';

type PropType = {
  navigation?: NavigationState;
  project: any;
  isDetail?: boolean;
};

const ProjectBox = ({ navigation, project, isDetail }: PropType) => {
  const [taskCount, setTaskCount] = useState(0)

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

  useEffect(() => {
    const count = project.tasks.length
    setTaskCount(count)
  }, [project.tasks])

  return (
    <View style={[styles.boxOuter, buttonCommonStyle, buttonOuterStyle]}>
      <View style={[styles.boxInner, buttonCommonStyle, buttonInnerStyle]}>
        <LinearGradient
          colors={gradColors}
          useAngle={true}
          angle={145}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={[styles.buttonFace, buttonFaceStyle]}>
          <View style={styles.infoArea}>
            <Text numberOfLines={isDetail ? undefined : 1}>プロジェクト名: {project.name}</Text>
            <Text numberOfLines={isDetail ? undefined : 1}>説明: {project.description}</Text>
            <Text>タスク数: {taskCount}</Text>
          </View>
          <View
            style={[styles.editArea, { display: isDetail ? 'flex' : 'none' }]}>
            <TouchableOpacity onPress={() => { navigation.navigate('ProjectEdit', { project: project }) }}>
              <Icon icon={faPen} size={28} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

export default ProjectBox;

const styles = StyleSheet.create({
  boxOuter: {
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
    flexDirection: 'row',
  },
  infoArea: {
    flexDirection: 'column',
    flex: 1,
  },
  editArea: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
