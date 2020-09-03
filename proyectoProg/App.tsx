import React from 'react';
import startScreen from './app/screens/start';
import LoginScreen from './app/screens/login';
import RegisterScreen from './app/screens/register';
import PublicationScreen from './app/screens/publicaciones';
import PublicarScreen from './app/screens/publicar';
import PerfilScreen from './app/screens/perfil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <stack.Navigator initialRouteName='Inicio'>
          <stack.Screen name='Inicio' component={startScreen} />
          <stack.Screen name='login' component={LoginScreen} />
          <stack.Screen name='register' component={RegisterScreen} />
          <stack.Screen name='publicaciones' component={PublicationScreen} />
          <stack.Screen name='publicar' component={PublicarScreen} />
          <stack.Screen name='perfil' component={PerfilScreen} />
        </stack.Navigator>
      </NavigationContainer>
  );
}
