import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ItemScreen from '../screens/ItemScreen';
import InventoryLogScreen from '../screens/InventoryLogScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case 'Items':
              return <FontAwesome name={'cubes'} size={size} color={color} />;
            case 'Inventory Log':
              return (
                <MaterialCommunityIcons
                  name={'chart-tree'}
                  size={size}
                  color={color}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="Items" component={ItemScreen} />
      <Tab.Screen name="Inventory Log" component={InventoryLogScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
