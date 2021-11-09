import React from 'react';
import {StyleSheet} from 'react-native';
import {t} from '../service/i18n/messages';
import Colors from '../styles/Colors';
import {Row, Table} from 'react-native-table-component';

export default function StockLogHeader() {
  return (
    <Table borderStyle={styles.table}>
      <Row
        data={[t('date'), t('batch'), t('quantity'), t('editRecord')]}
        style={styles.header}
        textStyle={styles.text}
      />
    </Table>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    height: 40,
    backgroundColor: Colors.background,
  },
  text: {
    textAlign: 'center',
    color: Colors.header,
  },
});
