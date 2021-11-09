import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import {DataTable} from 'react-native-paper';
import General from '../utility/General';
import React from 'react';

export default function StockLogRow({uuid, date, quantity, batch, onEdit}) {
  const Edit = () => (
    <FontAwesome name={'edit'} size={20} color={Colors.primary} />
  );

  return (
    <DataTable.Row key={uuid}>
      <DataTable.Cell>{General.toDisplayDate(date)}</DataTable.Cell>
      <DataTable.Cell>{batch}</DataTable.Cell>
      <DataTable.Cell>{quantity}</DataTable.Cell>
      <DataTable.Cell onPress={() => onEdit(uuid)}>
        <Edit />
      </DataTable.Cell>
    </DataTable.Row>
  );
}
