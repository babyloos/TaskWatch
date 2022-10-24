import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ProjectBox from '../components/ProjectBox';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

import { useProjects } from '../providers/TaskProvider';
import DelButton from '../components/DelButton';

const ProjectListScreen = ({ navigation }) => {
  const { projects, createProject, deleteItem, getActiveWork } = useProjects();
  var listRef = React.useRef(null)
  const work = getActiveWork()
  const [isUpdateListView, setIsUpdateListView] = React.useState(false)

  if (work) {
    // 未保存のworkがあればタイマ画面へ遷移する
    navigation.navigate('Timer', { work: work });
  }

  const scrollView = () => {
    listRef?.current?.scrollToEnd()
    setIsUpdateListView(false)
  }

  return (
    <View style={styles.body}>
      <SwipeListView
        listViewRef={(ref) => { listRef.current = ref }}
        onContentSizeChange = {(width: number, height: number)=>{
          if (isUpdateListView) {
            scrollView()
          }
        }}
        style={styles.projectBoxContainer}
        data={projects}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('ProjectDetail', { navigation: navigation, title: item.name, project: item });
            }}>
            <ProjectBox navigation={navigation} project={item} />
          </TouchableOpacity>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity onPress={() => {
            Alert.alert(
              data.item.name + ' を削除しますか？',
              '',
              [
                {
                  text: 'キャンセル',
                },
                {
                  text: '削除',
                  onPress: () => deleteItem(data.item),
                }
              ]
            );
          }}>
            <DelButton text={'削除'} />
          </TouchableOpacity>
        )}
        rightOpenValue={-102}
        disableRightSwipe={true}
      />
      <TouchableOpacity
        style={styles.addProjectButton}
        onPress={() => {
          createProject()
          scrollView()
          setIsUpdateListView(true)
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
