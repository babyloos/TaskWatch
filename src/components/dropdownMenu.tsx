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
import { FontAwesomeIcon as Icon, Props } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const DropDownMenu = (props: Props) => {
  let editCallback = props.editCallback;
  let deleteCallback = props.deleteCallback;

  return (
    <Menu>
      <MenuTrigger>
        <Icon icon={faEllipsisV} size={28} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value={1} onSelect={() => editCallback()}>
          <Text>編集</Text>
        </MenuOption>
        <MenuOption value={2} onSelect={() => deleteCallback()}>
          <Text style={{ color: 'red' }}>削除</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

export default DropDownMenu;
