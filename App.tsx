import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-get-random-values'
import { Realm, createRealmContext } from '@realm/react';

import ProjectListScreen from './src/screens/ProjectListScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import { TasksProvider } from './src/providers/TaskProvider';
import ProjectEditScreen from './src/screens/ProjectEditScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import TaskEditScreen from './src/screens/TaskEditScreen';
import TimerScreen from './src/screens/TimerScreen';

const Stack = createNativeStackNavigator();
const { RealmProvider, useRealm, useQuery } = createRealmContext()

const App = () => {
  return (
    <MenuProvider>
      <TasksProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ProjectList">
            <Stack.Screen
              name="ProjectList"
              component={ProjectListScreen}
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
              options={({ route }) => ({
                title: route.params.title + ' - 編集',
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
              })}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
              })}
            />
            <Stack.Screen
              name="TaskEdit"
              component={TaskEditScreen}
              options={({ route }) => ({
                title: route.params.title + ' - 編集',
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
              })}
            />
            <Stack.Screen
              name="Timer"
              component={TimerScreen}
              options={({ route }) => ({
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
              })}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </TasksProvider>
    </MenuProvider >
  );
}

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 0.9,
    backgroundColor: '#70c7ff',
  }
});
