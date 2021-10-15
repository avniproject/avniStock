import Background from '../components/Background';
import Header from '../components/Header';
import React, {Fragment, useEffect} from 'react';
import AppBar from '../components/AppBar';

const AddStockScreen = ({navigation}) => {
  useEffect(() => {
    console.log('AddStockScreen mounted');
  }, []);

  return (
    <Fragment>
      <AppBar title={'Add stock'} navigation={navigation} />
      <Background>
        <Header>Add Stock Screen</Header>
      </Background>
    </Fragment>
  );
};

export default AddStockScreen;
