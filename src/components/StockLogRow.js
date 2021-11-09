import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import General from '../utility/General';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TableWrapper, Cell} from 'react-native-table-component';

export default function StockLogRow({uuid, date, quantity, batch, onEdit}) {
  const Edit = () => (
    <View style={{alignSelf: 'center'}}>
      <FontAwesome
        onPress={() => onEdit(uuid)}
        name={'edit'}
        size={20}
        color={Colors.primary}
      />
    </View>
  );

  return (
    <TableWrapper key={uuid} style={styles.row}>
      <Cell data={General.toDisplayDate(date)} textStyle={styles.text} />
      <Cell data={batch} textStyle={styles.text} />
      <Cell data={quantity} textStyle={styles.text} />
      <Cell data={<Edit />} textStyle={styles.text} />
    </TableWrapper>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
