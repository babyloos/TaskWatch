import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
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
    <MenuProvider style={{ flexDirection: 'column', padding: 5 }}>
      <Menu onSelect={value => console.log('selected: ' + value)}>
        <MenuTrigger>
          <Icon icon={faEllipsisV} size={28} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1} text='One' />
          <MenuOption value={2}>
            <Text style={{ color: 'red' }}>Two</Text>
          </MenuOption>
          <MenuOption value={3} disabled={true} text='Three' />
        </MenuOptions>
      </Menu>
    </MenuProvider >
  );
}

export default DropDownMenu;
