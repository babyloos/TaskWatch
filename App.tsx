import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-get-random-values'
import { Realm, createRealmContext } from '@realm/react';

import TaskListScreen from './src/screens/TaskListScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import { TasksProvider } from './src/providers/TaskProvider';
import ProjectEditScreen from './src/screens/ProjectEditScreen';

const Stack = createNativeStackNavigator();
const { RealmProvider, useRealm, useQuery } = createRealmContext()

const App = () => {
  return (
    <MenuProvider>
      <TasksProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TaskList">
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{
                title: 'プロジェクト一覧',
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
              }}
            />
            <Stack.Screen
              name="ProjectDetail"
              component={ProjectDetailScreen}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
              })}
            />
            <Stack.Screen
              name="ProjectEdit"
              component={ProjectEditScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TasksProvider>
    </MenuProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 0.9,
    backgroundColor: '#70c7ff',
  }
});
