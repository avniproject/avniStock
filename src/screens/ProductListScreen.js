import React, {Fragment, useCallback, useState} from 'react';
import AppBar from '../components/AppBar';
import {useFocusEffect} from '@react-navigation/core';
import ProductList from '../components/ProductList';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';

const ProductListScreen = ({navigation, route}) => {
  const [products, setProducts] = useState([]);
  const loginSync = route.params && route.params.loginSync;

  useFocusEffect(
    useCallback(() => {
      const products = getService(ProductService).getSortedProductList();
      setProducts(products);
      return () => {};
    }, []),
  );

  return (
    <Fragment>
      <AppBar
        title={'Product List'}
        navigation={navigation}
        loginSync={loginSync}
      />
      <ProductList navigation={navigation} products={products} />
    </Fragment>
  );
};

export default ProductListScreen;
