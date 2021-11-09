import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import ProductList from './ProductList';
import {View} from 'react-native';

export default function RestockReport({navigation}) {
  const [productsToRestock, setProductsToRestock] = React.useState([]);

  useFocusEffect(
    useCallback(() => {
      const products = getService(ProductService).getRestockNeededProducts();
      setProductsToRestock(products);
      return () => {};
    }, []),
  );

  return (
    <View style={{paddingBottom: 50}}>
      <ProductList
        navigation={navigation}
        products={productsToRestock}
        displayRestockLevel={true}
        disableEdit={true}
      />
    </View>
  );
}
