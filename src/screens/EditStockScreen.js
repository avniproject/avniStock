import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import Stock from '../components/Stock';

const EditStockScreen = ({navigation, route}) => {
  return (
    <Fragment>
      <AppBar
        title={'Edit stock'}
        navigation={navigation}
        showBackButton={true}
      />
      <Stock navigation={navigation} productUUID={route.params.productUUID} />
    </Fragment>
  );
};

export default EditStockScreen;
