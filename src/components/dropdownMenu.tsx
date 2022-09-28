import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const DropDownMenu = () => {
  return (
    <Menu onSelect={value => console.log('selected: ' + value)}>
      <MenuTrigger>
        <Icon icon={faEllipsisV} size={28} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value={1}>
          <Text>編集</Text>
        </MenuOption>
        <MenuOption value={2}>
          <Text style={{ color: 'red' }}>削除</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

export default DropDownMenu;
