import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SigninScreen from '../screens/Registration/SignInScreen';
import SignUpScreen from '../screens/Registration/SignUpScreen';

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="SignIn" component={SigninScreen} />
      <RootStack.Screen name="SignUp" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;