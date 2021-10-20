import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import EditProductScreen from '../screens/EditProductScreen';
import EditStockScreen from '../screens/EditStockScreen';
import EditRemovedStockScreen from '../screens/EditRemovedStockScreen';

export default function Navigator({userExists}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={userExists ? 'HomeScreen' : 'LoginScreen'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="Product Details" component={ProductDetailsScreen} />
      <Stack.Screen name="Edit Product" component={EditProductScreen} />
      <Stack.Screen name="Edit Stock" component={EditStockScreen} />
      <Stack.Screen
        name="Edit Removed Stock"
        component={EditRemovedStockScreen}
      />
    </Stack.Navigator>
  );
}
