import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import Colors from '../styles/Colors';
import _ from 'lodash';
import {StyleSheet} from 'react-native';

export default function ProductDropdown({
  productUUID = null,
  setProductUUID = _.noop,
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const products = getService(ProductService).getSortedProductList();
    setItems(products);
  }, []);

  const productSchema = {
    label: 'name',
    value: 'uuid',
  };

  return (
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
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 56,
    borderColor: Colors.border,
  },
});
