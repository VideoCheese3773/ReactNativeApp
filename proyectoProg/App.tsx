import React from 'react';
import startScreen from './app/screens/start';
import LoginScreen from './app/screens/login';
import RegisterScreen from './app/screens/register';
import PublicationScreen from './app/screens/publicaciones';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet } from 'react-native';

const stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <stack.Navigator initialRouteName='Inicio'>
          <stack.Screen name='Inicio' component={startScreen} />
          <stack.Screen name='login' component={LoginScreen} />
          <stack.Screen name='register' component={RegisterScreen} />
          <stack.Screen name='publicaciones' component={PublicationScreen} />
        </stack.Navigator>
      </NavigationContainer>
  );
}
