import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ProjectBox from '../components/ProjectBox';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

import { useProjects } from '../providers/TaskProvider';
import ProjectDelButton from '../components/ProjectDelButton';

const ProjectListScreen = ({ navigation }) => {
  const { createProject, deleteItem, projects} = useProjects();

  return (
    <View style={styles.body}>
      <SwipeListView
        style={styles.projectBoxContainer}
        data={projects}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem = {({item}) => (
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=>{
              navigation.navigate('ProjectDetail', {title: item.name, project: item});
            }}>
            <ProjectBox navigation={navigation} project={item}/>
          </TouchableOpacity>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity onPress={()=>{deleteItem(data.item)}}>
            <ProjectDelButton text={'削除'}/>
          </TouchableOpacity>
        )}
        rightOpenValue={-102}
        disableRightSwipe={true}
        />
      <TouchableOpacity
        style={styles.addProjectButton}
        onPress={() => {
          createProject();
        }}>
        <Icon icon={faCirclePlus} size={62} />
      </TouchableOpacity>
    </View>
  );
}

export default ProjectListScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  projectBoxContainer: {
    flex: 1,
  },
  addProjectButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
});
