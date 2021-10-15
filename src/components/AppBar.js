import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';
import Sync from './Sync';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppBar({title = '', navigation, showBackButton}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <MaterialCommunityIcons
            name={'arrow-left'}
            style={styles.icon}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text style={styles.header}>{title}</Text>
      </View>
      <View>{!showBackButton && <Sync navigation={navigation} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    height: 60,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    color: Colors.text,
    paddingVertical: 12,
    opacity: 0.8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
});
