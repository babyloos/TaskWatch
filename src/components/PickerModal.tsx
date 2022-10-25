import React, { useState } from 'react'
import {
  View,
  Modal,
  StyleSheet,
} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const PickerModal = (props) => {

  const items = props.items
  const selectedItem = props.selectedItem
  const setSelectedItem = props.setSelectedItem
  const isShowPicker = props.isShowPicker
  const setIsShowPicker = props.setIsShowPicker

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isShowPicker}
    >
      <TouchableWithoutFeedback onPress={() => {
        setIsShowPicker(false)
      }}>
        <View style={styles.pickerModal}>
          <Picker
            style={{ width: '100%' }}
            selectedValue={selectedItem}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedItem(itemValue)
            }}>
            {items.map((item: any, index: number) => {
              return (
                <Picker.Item
                  key={index}
                  label={item}
                  value={index}
                />
              )
            })}
          </Picker>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default PickerModal

const styles = StyleSheet.create({
  pickerModal: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
