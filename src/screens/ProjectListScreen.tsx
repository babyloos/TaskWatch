import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ProjectBox from '../components/ProjectBox';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

import { useProjects } from '../providers/TaskProvider';

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
            <View style={styles.swipeItem}>
              <Text>削除</Text>
            </View>
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
  addProjectButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
});
