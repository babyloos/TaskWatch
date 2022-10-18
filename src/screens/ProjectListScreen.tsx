import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import ProjectBox from '../components/ProjectBox';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import Dialog from "react-native-dialog";

import { useProjects } from '../providers/TaskProvider';
import DelButton from '../components/DelButton';
import { ScrollView } from 'react-native-gesture-handler';

const ProjectListScreen = ({ navigation }) => {
  const { projects, createProject, deleteItem, getActiveWork } = useProjects();
  const scrollViewRef = React.useRef<ScrollView>(null);

  const work = getActiveWork()
  if (work) {
    // タイマ動作中のworkがあればタイマ画面へ遷移する
    navigation.navigate('Timer', { work: work });
  }

  return (
    <View style={styles.body}>
      <ScrollView ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollViewRef?.current?.scrollTo({ y: contentHeight });
        }}>
        <SwipeListView
          style={styles.projectBoxContainer}
          data={projects}
          keyExtractor={(item) => item._id.toHexString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('ProjectDetail', { title: item.name, project: item });
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
      </ScrollView>
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
