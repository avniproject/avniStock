import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Badge({component, number}) {
  const [height, width, fontSize] = number > 99 ? [17, 17, 9] : [17, 17, 11];
  return (
    <View style={styles.container}>
      {number > 0 && (
        <View style={[styles.numberContainer, {height, width}]}>
          <Text style={[styles.number, {fontSize}]}>{number}</Text>
        </View>
      )}
      {component}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  numberContainer: {
    position: 'absolute',
    top: 8,
    right: 0,
    backgroundColor: 'mediumvioletred',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
