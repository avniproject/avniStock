import {DataTable} from 'react-native-paper';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {t} from '../service/i18n/messages';
import Colors from '../styles/Colors';

export default function StockLohHeader() {
  const renderHeader = title => <Text style={styles.headerText}>{title}</Text>;
  return (
    <DataTable.Header>
      <DataTable.Title>{renderHeader(t('date'))}</DataTable.Title>
      <DataTable.Title>{renderHeader(t('batchNumber'))}</DataTable.Title>
      <DataTable.Title>{renderHeader(t('quantity'))}</DataTable.Title>
      <DataTable.Title>{renderHeader(t('editRecord'))}</DataTable.Title>
    </DataTable.Header>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    color: Colors.lightBlack,
  },
});
