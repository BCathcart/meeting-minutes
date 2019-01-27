import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

//import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import MeetingMenuScreen from '../screens/MeetingMenuScreen';
import NewMeetingScreen from '../screens/NewMeetingScreen';
import MeetingCodeEnterScreen from '../screens/MeetingCodeEnterScreen';
const AppStack = createStackNavigator({ Home: HomeScreen,
  NewMeeting: NewMeetingScreen,
  Continue: MeetingMenuScreen,
  EnterCode: MeetingCodeEnterScreen});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Main: MainTabNavigator,
  // AuthLoading: AuthLoadingScreen,
  // App: AppStack,
  // Auth: AuthStack,
  Main: AppStack
}));
