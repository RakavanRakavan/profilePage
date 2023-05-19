import {Image} from 'react-native';
import React from 'react';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screens/profile';
import Home from '../../screens/home';
import Trip from '../../screens/trip';
import {useTheme} from '@react-navigation/native';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#E68C3F',
          height: 60,
          paddingBottom: 5,
          paddingTop: 10,
        },
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../../assets/png/home.png')}
            />
            // <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Trip"
        component={Trip}
        options={{
          tabBarLabel: 'Trip',
          tabBarIcon: ({color}) => (
            // <Image source={require("../../assets/png/trip.png")} />
            <Image source={require('../../assets/png/trip.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Image source={require('../../assets/png/profile.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
