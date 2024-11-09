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
} from 'react-native';
import Header from './src/components/Header';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import News from './src/screens/News';
import SignIn from './src/screens/SignIn';

const Stack = createNativeStackNavigator();

const RootStack=()=>{
  return(
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="News" component={News}/>
      <Stack.Screen name="SignIn" component={SignIn}/>
    </Stack.Navigator>
  )
}

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
