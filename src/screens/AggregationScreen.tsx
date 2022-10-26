import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PickerModal from '../components/PickerModal';
import { useProjects } from '../providers/TaskProvider';

const AggregationScreen = () => {
  const getProjectNameList = (projects: any): Array<string> => {
    let result = new Array<string>()
    for (var i=0; i<projects.length; i++) {
      result.push(projects[i].name)
    }
    return result
  }

  const { projects } = useProjects()
  const projectList = getProjectNameList(projects)
  const [isShowPicker, setIsShowPicker] = useState(false)
  const [selectedProject, setSelectedProjcet] = useState(0)

  return (
    <View style={styles.body}>
      <View style={styles.specifyItemContainer}>
        <View style={styles.specifyItem}>
          <View style={styles.specifyItemName}><Text style={styles.itemNameText}>集計するプロジェクト/タスク</Text></View>
          <View style={styles.specifyItemValue}>
            <TouchableOpacity onPress={() => {
              setIsShowPicker(true)
            }}>
              <Text style={styles.selectedItem}>{projectList[selectedProject]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PickerModal
        isShowPicker={isShowPicker} setIsShowPicker={setIsShowPicker}
        selectedItem={selectedProject} setSelectedItem={setSelectedProjcet}
        items={projectList}
      />
    </View>
  )
}

export default AggregationScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    margin: 18,
  },
  specifyItemContainer: {
    flexDirection: 'column',
  },
  specifyItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  specifyItemName: {
    marginRight: 20,
  },
  itemNameText: {
    fontSize: 18,
  },
  itemValueText: {
    fontSize: 16,
  },
  specifyItemValue: {
    backgroundColor: 'red',
    width: '50%',
    marginTop: 12,
  },
  selectedItem: {
    fontSize: 24,
  }
});
