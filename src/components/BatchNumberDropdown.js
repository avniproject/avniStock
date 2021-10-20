import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {getService} from '../hooks/getService';
import Colors from '../styles/Colors';
import _ from 'lodash';
import {StyleSheet, Text, View} from 'react-native';
import StockService from '../service/StockService';

export default function BatchNumberDropdown({
  productBatchUUID = null,
  setProductBatchUUID = _.noop,
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const productBatches = getService(StockService).getBatchDetails();
    setItems(productBatches);
  }, []);

  const productSchema = {
    label: 'batchNumber',
    value: 'uuid',
  };

  return (
    <View style={{marginVertical: 10}}>
      <Text style={styles.label}>{'Batch Number'}</Text>
      <DropDownPicker
        schema={productSchema}
        open={open}
        value={productBatchUUID}
        items={items}
        setOpen={setOpen}
        setValue={value => setProductBatchUUID(value())}
        setItems={setItems}
        searchable={true}
        placeholder={'Select Batch'}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderColor: Colors.border,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
  },
});
