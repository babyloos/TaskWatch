import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-get-random-values'
import mobileAds, { MaxAdContentRating, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

import ProjectListScreen from './src/screens/ProjectListScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import { TasksProvider } from './src/providers/TaskProvider';
import ProjectEditScreen from './src/screens/ProjectEditScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import TaskEditScreen from './src/screens/TaskEditScreen';
import TimerScreen from './src/screens/TimerScreen';
import WorkEditScreen from './src/screens/WorkEditScreen';
import AggregationScreen from './src/screens/AggregationScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  // 広告用設定
  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      })
      .then(() => {
        // Request config successfully set!
      })

    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
      });
  }, []);

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
              name="WorkEdit"
              component={WorkEditScreen}
              options={({ route }) => ({
                title: '作業履歴 - 編集',
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
                gestureEnabled: false,
              })}
            />
            <Stack.Screen
              name="Aggregation"
              component={AggregationScreen}
              options={({ route }) => ({
                title: '集計',
                headerStyle: {
                  backgroundColor: '#61adf5',
                },
                contentStyle: styles.body,
                gestureEnabled: false,
              })}
            />

          </Stack.Navigator>
        </NavigationContainer>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </TasksProvider>
    </MenuProvider >
  );
}

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#70c7ff',
  }
});
