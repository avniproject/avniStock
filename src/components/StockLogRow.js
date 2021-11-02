import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import {DataTable} from 'react-native-paper';
import General from '../utility/General';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function StockLogRow({uuid, date, quantity, batch, onEdit}) {
  const Edit = () => (
    <FontAwesome name={'edit'} size={20} color={Colors.primary} />
  );

  return (
    <DataTable.Row key={uuid}>
      <DataTable.Cell style={styles.row}>
        {General.toDisplayDate(date)}
      </DataTable.Cell>
      <DataTable.Cell style={styles.row}>{batch}</DataTable.Cell>
      <DataTable.Cell style={styles.row}>{quantity}</DataTable.Cell>
      <DataTable.Cell style={styles.row} onPress={() => onEdit(uuid)}>
        <Edit />
      </DataTable.Cell>
    </DataTable.Row>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
  },
});
