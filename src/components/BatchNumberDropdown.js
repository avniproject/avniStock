import React, {useState, useCallback} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {getService} from '../hooks/getService';
import Colors from '../styles/Colors';
import _ from 'lodash';
import {StyleSheet, Text, View} from 'react-native';
import StockService from '../service/StockService';
import ErrorText from './ErrorText';
import {useFocusEffect} from '@react-navigation/core';

export default function BatchNumberDropdown({
  productUUID,
  productBatchUUID = null,
  setProductBatchUUID = _.noop,
  errorText,
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const productBatches =
        getService(StockService).getBatchDetailsForProduct(productUUID);
      setItems(productBatches);
      return () => {
        setOpen(false);
      };
    }, [productUUID]),
  );
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
        listMode="SCROLLVIEW"
        listItemContainerStyle={{borderColor: Colors.border}}
        dropDownContainerStyle={{borderColor: Colors.border}}
        searchContainerStyle={{borderBottomColor: Colors.border}}
        searchPlaceholder={'Search Batch...'}
        zIndex={100}
      />
      <ErrorText errorText={errorText} />
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
