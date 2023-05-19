/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomTab from './src/navigation/bottomTab';
import { NavigationContainer } from '@react-navigation/native';

function App() {

  return (
       <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  Container: {
   flex:1,
   backgroundColor:"#fff",

  },
});

export default App;
