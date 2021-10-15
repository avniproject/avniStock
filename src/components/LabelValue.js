import React from 'react';
import {Caption, Subheading} from 'react-native-paper';
import {View} from 'react-native';

export default function LabelValue({label, value}) {
  return (
    <View style={{marginBottom: 12}}>
      <Caption>{label}</Caption>
      <Subheading>{value}</Subheading>
    </View>
  );
}
