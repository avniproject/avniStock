import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../styles/Colors';

export default function Spinner({show}) {
  return show ? (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={Colors.primary} />
    </View>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: Colors.surface,
  },
});
