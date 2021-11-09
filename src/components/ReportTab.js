import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../styles/Colors';
import React from 'react';

export default function ReportTab({tab, isSelected, onPress}) {
  return (
    <View key={tab}>
      <TouchableOpacity
        style={[
          styles.container,
          isSelected && {
            backgroundColor: Colors.primary,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 20,
            color: isSelected ? Colors.surface : Colors.text,
          }}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 3,
    paddingTop: 2,
    marginTop: 10,
    marginHorizontal: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
  },
});
