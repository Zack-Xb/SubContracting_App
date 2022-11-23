import * as React from 'react';
import {Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import { Inbox } from '../Screens/Inbox';
import { Search } from '../Screens/Search';
import { Orders } from '../Screens/Orders';
import { Profile } from '../Screens/Profile';

const Tab = createMaterialBottomTabNavigator();


const BottomNav = () => {
  
  return (
    <Tab.Navigator
    activeColor="#03E1FF"
    barStyle={{ backgroundColor: '#111111'}}
    

  >
   
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
      
    />
     <Tab.Screen
      name="Inbox"
      component={Inbox}
      options={{
        tabBarLabel: 'Inbox',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="inbox" color={color} size={26} />
        ),
      }}
    />
     <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={26} />
        ),
      }}
    />
     <Tab.Screen
      name="Orders"
      component={Orders}
      options={{
        tabBarLabel: 'Orders',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="clipboard-text" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
}


export default BottomNav;