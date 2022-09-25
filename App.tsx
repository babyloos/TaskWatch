import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from './src/screens/TaskListScreen';
import { StyleSheet, View } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ 
            title: 'タスク一覧',
            headerStyle: {
              backgroundColor: '#61adf5',
            },
            contentStyle: styles.body,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 0.8,
    backgroundColor: '#70c7ff',
  }
});
