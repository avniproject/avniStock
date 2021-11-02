import React, {useState, useCallback} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import Colors from '../styles/Colors';
import _ from 'lodash';
import {StyleSheet, Text, View} from 'react-native';
import ErrorText from './ErrorText';
import {useFocusEffect} from '@react-navigation/core';

export default function ProductDropdown({
  productUUID = null,
  setProductUUID = _.noop,
  errorText,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const products = getService(ProductService).getSortedProductList();
      setItems(products);
      return () => {
        setOpen(false);
      };
    }, []),
  );

  const productSchema = {
    label: 'name',
    value: 'uuid',
  };

  return (
    <View style={{marginVertical: 10}}>
      <Text style={styles.label}>{'Product'}</Text>
      <DropDownPicker
        schema={productSchema}
        open={open}
        value={productUUID}
        items={items}
        setOpen={setOpen}
        setValue={value => setProductUUID(value())}
        setItems={setItems}
        searchable={true}
        placeholder={'Select Product'}
        style={styles.container}
        listMode="SCROLLVIEW"
        listItemContainerStyle={{borderColor: Colors.border}}
        dropDownContainerStyle={{borderColor: Colors.border}}
        searchContainerStyle={{borderBottomColor: Colors.border}}
        searchPlaceholder={'Search Product...'}
        zIndex={200}
        disabled={disabled}
        showArrowIcon={!disabled}
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
