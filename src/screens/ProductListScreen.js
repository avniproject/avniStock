import React, {Fragment, useCallback, useState} from 'react';
import AppBar from '../components/AppBar';
import {useFocusEffect} from '@react-navigation/core';
import ProductList from '../components/ProductList';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import {t} from '../service/i18n/messages';

const ProductListScreen = ({navigation, route}) => {
  const [products, setProducts] = useState([]);
  const loginSync = route.params && route.params.loginSync;
  const [productName, setProductName] = useState();

  useFocusEffect(
    useCallback(() => {
      const products =
        getService(ProductService).getSortedProductList(productName);
      setProducts(products);
      return () => {};
    }, [productName]),
  );

  return (
    <Fragment>
      <AppBar
        title={t('productList')}
        navigation={navigation}
        loginSync={loginSync}
        productName={productName}
        setProductName={setProductName}
      />
      <ProductList navigation={navigation} products={products} />
    </Fragment>
  );
};

export default ProductListScreen;
