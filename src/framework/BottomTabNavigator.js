import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/ProductListScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RestockNeededScreen from '../screens/RestockNeededScreen';
import SellStockScreen from '../screens/SellStockScreen';
import AddStockScreen from '../screens/AddStockScreen';

const Tab = createBottomTabNavigator();

const getIconForRoute = (routeName, size, color, focused) => {
  switch (routeName) {
    case 'Product List':
      return <FontAwesome name={'cubes'} size={size} color={color} />;
    case 'Restock needed':
      return (
        <MaterialCommunityIcons name={'chart-tree'} size={size} color={color} />
      );
    case 'Add Stock':
      return (
        <Fontisto name={'shopping-basket-add'} size={size} color={color} />
      );
    case 'Sell':
      return (
        <FontAwesome5 name={'ruler-horizontal'} size={size} color={color} />
      );
  }
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Product List'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          getIconForRoute(route.name, size, color, focused),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Add Stock" component={AddStockScreen} />
      <Tab.Screen name="Product List" component={ProductListScreen} />
      <Tab.Screen name="Sell" component={SellStockScreen} />
      <Tab.Screen name="Restock needed" component={RestockNeededScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
