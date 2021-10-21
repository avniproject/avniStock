import {StyleSheet, View} from 'react-native';
import {Badge, Caption} from 'react-native-paper';
import React from 'react';
import Colors from '../styles/Colors';

export default function BadgeText({text, number}) {
  return (
    <View style={styles.container}>
      <Caption>{text}</Caption>
      <View>
        <Badge style={styles.badge}>{number}</Badge>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.background,
    color: Colors.lightBlack,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});