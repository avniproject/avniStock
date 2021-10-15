import Background from '../components/Background';
import React, {Fragment, useEffect} from 'react';
import Header from '../components/Header';
import AppBar from '../components/AppBar';

const ProductListScreen = ({navigation}) => {
  useEffect(() => {
    console.log('ProductListScreen mounted');
  }, []);

  return (
    <Fragment>
      <AppBar title={'Product List'} navigation={navigation} />
      <Background>
        <Header>Product List Screen</Header>
      </Background>
    </Fragment>
  );
};

export default ProductListScreen;
