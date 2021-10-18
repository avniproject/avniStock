import React from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';
import Colors from '../styles/Colors';

export default function BottomActionButtons({onCancel, onSave}) {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={{flex: 0.5}}>
          <TouchableNativeFeedback onPress={onCancel}>
            <View style={styles.textContainer}>
              <Text style={styles.cancelText}>{'Cancel'}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{flex: 0.5}}>
          <TouchableNativeFeedback onPress={onSave}>
            <View style={styles.textContainer}>
              <Text style={styles.saveText}>{'Save'}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    height: 60,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: Colors.text,
    fontSize: 20,
    opacity: 0.7,
  },
  saveText: {
    alignSelf: 'center',
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
