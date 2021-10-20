import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Separator({...props}) {
  return <View style={styles.style} {...props} />;
}
const styles = StyleSheet.create({
  style: {
    height: 1,
    backgroundColor: '#00000012',
  },
});
