import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import TaskListScreen from './src/screens/TaskListScreen';
import ProjectEditScreen from './src/screens/ProjectEditScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen
            name="TaskList"
            component={TaskListScreen}
            options={{ 
              title: 'プロジェクト/タスク一覧',
              headerStyle: {
                backgroundColor: '#61adf5',
              },
              contentStyle: styles.body,
            }}
          />
          <Stack.Screen 
            name="ProjectEdit"
            component={ProjectEditScreen}
            options={{
              title: 'プロジェクト編集',
              headerStyle: {
                backgroundColor: '#61adf5',
              },
              contentStyle: styles.body,
            }}
          />
          </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#70c7ff',
  }
});
