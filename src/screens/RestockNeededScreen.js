import Background from '../components/Background';
import Header from '../components/Header';
import React, {Fragment, useEffect} from 'react';
import AppBar from '../components/AppBar';

const RestockNeededScreen = ({navigation}) => {
  useEffect(() => {
    console.log('RestockNeededScreen mounted');
  }, []);

  return (
    <Fragment>
      <AppBar title={'Restock needed'} navigation={navigation} />
      <Background>
        <Header>Restock Needed Screen</Header>
      </Background>
    </Fragment>
  );
};

export default RestockNeededScreen;
