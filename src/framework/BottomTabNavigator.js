import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/ProductListScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RestockNeededScreen from '../screens/RestockNeededScreen';
import RemoveStockScreen from '../screens/RemoveStockScreen';
import AddStockScreen from '../screens/AddStockScreen';
import Colors from '../styles/Colors';

const Tab = createBottomTabNavigator();

const getIconForRoute = (routeName, size, color) => {
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
    case 'Remove Stock':
      return (
        <FontAwesome5 name={'ruler-horizontal'} size={size} color={color} />
      );
  }
};

const BottomTabNavigator = ({route, navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName={'Product List'}
      backBehavior={'history'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          getIconForRoute(route.name, size, color),
        headerShown: false,
        tabBarActiveTintColor: Colors.surface,
        tabBarActiveBackgroundColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.surface,
        tabBarStyle: {
          display: ['Add Stock', 'Remove Stock'].includes(route.name)
            ? 'none'
            : 'flex',
        },
      })}
    >
      <Tab.Screen name="Add Stock" component={AddStockScreen} />
      <Tab.Screen
        name="Product List"
        component={ProductListScreen}
        initialParams={route.params}
      />
      <Tab.Screen name="Remove Stock" component={RemoveStockScreen} />
      <Tab.Screen name="Restock needed" component={RestockNeededScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
