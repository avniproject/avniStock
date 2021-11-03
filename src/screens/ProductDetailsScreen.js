import React, {Fragment, useCallback, useState} from 'react';
import AppBar from '../components/AppBar';
import Individual from '../models/transactional/Individual';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import ProductDetails from '../components/ProductDetails';
import {useFocusEffect} from '@react-navigation/core';
import {t} from '../service/i18n/messages';

const ProductDetailsScreen = ({navigation, route}) => {
  const {productUUID} = route.params;
  const [product, setProduct] = useState(Individual.createEmptyInstance);

  useFocusEffect(
    useCallback(() => {
      setProduct(getService(ProductService).findByUUID(productUUID));
      return () => {};
    }, [productUUID]),
  );

  return (
    <Fragment>
      <AppBar
        title={t('productDetails')}
        navigation={navigation}
        showBackButton={true}
      />
      <ProductDetails product={product} navigation={navigation} />
    </Fragment>
  );
};

export default ProductDetailsScreen;
