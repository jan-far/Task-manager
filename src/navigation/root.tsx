import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import AddTask from '../screens/AddTask';
import TaskDetails from '../screens/TaskDetails';
import {RootStackParamList} from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AddTask}
        name="AddTask"
        options={{headerTitle: 'Add Task'}}
      />
      <Stack.Screen
        component={TaskDetails}
        name="TaskDetails"
        options={{headerTitle: 'Task Details'}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
