import React, {Fragment, useCallback, useState} from 'react';
import AppBar from '../components/AppBar';
import {useFocusEffect} from '@react-navigation/core';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import ProductList from '../components/ProductList';

const RestockNeededScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const products = getService(ProductService).getRestockNeededProducts();
      setProducts(products);
      return () => {};
    }, []),
  );

  return (
    <Fragment>
      <AppBar title={'Restock needed'} navigation={navigation} />
      <ProductList navigation={navigation} products={products} />
    </Fragment>
  );
};

export default RestockNeededScreen;
