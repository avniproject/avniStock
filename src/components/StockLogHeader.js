import {DataTable} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {t} from '../service/i18n/messages';

export default function StockLohHeader() {
  return (
    <DataTable.Header>
      <DataTable.Title style={styles.header}>{t('date')}</DataTable.Title>
      <DataTable.Title style={styles.header}>
        {t('batchNumber')}
      </DataTable.Title>
      <DataTable.Title style={styles.header}>{t('quantity')}</DataTable.Title>
      <DataTable.Title style={styles.header}>{t('editRecord')}</DataTable.Title>
    </DataTable.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
  },
});
