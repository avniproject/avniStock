import Background from '../components/Background';
import Header from '../components/Header';
import React, {Fragment, useEffect} from 'react';
import AppBar from '../components/AppBar';

const EditProductScreen = ({navigation, route}) => {
  const {productUUID} = route.params;

  useEffect(() => {
    console.log('EditProductScreen mounted', productUUID);
  }, []);

  return (
    <Fragment>
      <AppBar
        title={'Edit Product'}
        navigation={navigation}
        showBackButton={true}
      />
      <Background>
        <Header>Edit Product Screen</Header>
      </Background>
    </Fragment>
  );
};

export default EditProductScreen;
