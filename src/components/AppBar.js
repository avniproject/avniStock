import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';
import Sync from './Sync';

export default function AppBar({title}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
      <View>
        <Sync />
      </View>
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
});
