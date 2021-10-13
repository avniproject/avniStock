import Background from '../components/Background';
import Header from '../components/Header';
import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';

const InventoryLogScreen = () => {
  return (
    <Fragment>
      <AppBar title={'Inventory Log'} />
      <Background>
        <Header>Inventory Log Screen</Header>
      </Background>
    </Fragment>
  );
};

export default InventoryLogScreen;
