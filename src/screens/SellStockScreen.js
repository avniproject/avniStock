import Background from '../components/Background';
import Header from '../components/Header';
import React, {Fragment, useEffect} from 'react';
import AppBar from '../components/AppBar';

const SellStockScreen = ({navigation}) => {
  useEffect(() => {
    console.log('SellStockScreen mounted');
  }, []);

  return (
    <Fragment>
      <AppBar
        title={'Remove Stock'}
        navigation={navigation}
        showBackButton={true}
      />
      <Background>
        <Header>Remove Stock Screen</Header>
      </Background>
    </Fragment>
  );
};

export default SellStockScreen;
