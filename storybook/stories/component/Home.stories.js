import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from '../../../src/framework/BottomTabNavigator';

storiesOf('HomeScreen', module).add('Home screen', () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
));
