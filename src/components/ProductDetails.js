import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LabelValue from './LabelValue';
import Colors from '../styles/Colors';

export default function ProductDetails({product}) {
  const {name, unit, initialStock, restockLevel} = product;
  return (
    <SafeAreaView style={styles.container}>
      <LabelValue label={'Name'} value={name} />
      <LabelValue label={'Initial Stock'} value={`${initialStock} ${unit}`} />
      <LabelValue label={'Restock Level'} value={restockLevel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: 16,
    flex: 1,
  },
});
