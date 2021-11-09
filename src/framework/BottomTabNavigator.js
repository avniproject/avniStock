import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/ProductListScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReportScreen from '../screens/ReportScreen';
import RemoveStockScreen from '../screens/RemoveStockScreen';
import AddStockScreen from '../screens/AddStockScreen';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';

const Tab = createBottomTabNavigator();

const getIconForRoute = (routeName, size, color) => {
  switch (routeName) {
    case 'Product List':
      return (
        <MaterialCommunityIcons
          name={'format-list-bulleted'}
          size={size}
          color={color}
        />
      );
    case 'Reports':
      return (
        <MaterialCommunityIcons
          name={'align-vertical-bottom'}
          size={size}
          color={color}
        />
      );
    case 'Add Stock':
      return (
        <MaterialCommunityIcons
          name={'plus-circle'}
          size={size}
          color={color}
        />
      );
    case 'Remove Stock':
      return (
        <MaterialCommunityIcons
          name={'minus-circle'}
          size={size}
          color={color}
        />
      );
  }
};

const getLabel = routeName => {
  switch (routeName) {
    case 'Product List':
      return t('productList');
    case 'Reports':
      return t('reports');
    case 'Add Stock':
      return t('addStock');
    case 'Remove Stock':
      return t('removeStock');
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
        tabBarLabel: getLabel(route.name),
      })}
    >
      <Tab.Screen name="Add Stock" component={AddStockScreen} />
      <Tab.Screen
        name="Product List"
        component={ProductListScreen}
        initialParams={route.params}
      />
      <Tab.Screen name="Remove Stock" component={RemoveStockScreen} />
      <Tab.Screen name="Reports" component={ReportScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
