import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ScrollView } from 'react-native-gesture-handler';

import ProjectBox from '../components/ProjectBox';
import TaskBox from '../components/TaskBox';
import { useProjects } from '../providers/TaskProvider';

const ProjectDetailScreen = (props) => {
  const { createTask, deleteItem } = useProjects();
  const project = props.route.params.project;
  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <ProjectBox navigation={props.navigation} project={project} editable={true}/>
      <ScrollView ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight)=> {
          scrollViewRef?.current?.scrollTo({y: contentHeight});
      }}>
        <SwipeListView
          data={project.tasks}
          keyExtractor={(item) => item._id.toHexString()}
          renderItem = {({item}) => (
            <TaskBox task={item}/>  
          )}
          renderHiddenItem={ (data, rowMap) => (
            <TouchableOpacity onPress={()=>{deleteItem(data.item)}}>
              <View style={styles.swipeItem}>
                <Text>削除</Text>
              </View>
            </TouchableOpacity>
          )}
          rightOpenValue={-58}
          disableRightSwipe={true}
        />
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={() => {
            createTask(project);
          }}>
          <Icon icon={faCirclePlus} size={34} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ProjectDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeItem: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginEnd: 32,
    borderRadius: 12,
    width: 50,
    height: 64,
    backgroundColor: '#00FF00',
  },
  addTaskButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginRight: 32,
  }
});
