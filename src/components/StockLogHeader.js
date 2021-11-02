import {DataTable} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function StockLohHeader() {
  return (
    <DataTable.Header>
      <DataTable.Title style={styles.header}>Date</DataTable.Title>
      <DataTable.Title style={styles.header}>Batch Number</DataTable.Title>
      <DataTable.Title style={styles.header}>Quantity</DataTable.Title>
      <DataTable.Title style={styles.header}>Edit Record</DataTable.Title>
    </DataTable.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
  },
});
