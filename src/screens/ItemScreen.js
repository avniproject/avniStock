import Background from '../components/Background';
import React, {Fragment} from 'react';
import Header from '../components/Header';
import AppBar from '../components/AppBar';

const ItemScreen = () => {
  return (
    <Fragment>
      <AppBar title={'Items'} />
      <Background>
        <Header>Item Screen</Header>
      </Background>
    </Fragment>
  );
};

export default ItemScreen;
