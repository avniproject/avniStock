import React from 'react';
import {Paragraph, Subheading} from 'react-native-paper';
import {View} from 'react-native';

export default function LabelValue({label, value}) {
  return (
    <View style={{marginBottom: 12}}>
      <Paragraph>{label}</Paragraph>
      <Subheading>{value}</Subheading>
    </View>
  );
}
