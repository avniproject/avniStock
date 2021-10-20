import React, {Fragment, useEffect, useState} from 'react';
import AppBar from '../components/AppBar';
import Individual from '../models/transactional/Individual';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsScreen = ({navigation, route}) => {
  const {productUUID} = route.params;
  const [product, setProduct] = useState(Individual.createEmptyInstance);

  useEffect(() => {
    setProduct(getService(ProductService).findByUUID(productUUID));
  }, [productUUID]);

  return (
    <Fragment>
      <AppBar
        title={'Product Details'}
        navigation={navigation}
        showBackButton={true}
      />
      <ProductDetails product={product} navigation={navigation} />
    </Fragment>
  );
};

export default ProductDetailsScreen;
