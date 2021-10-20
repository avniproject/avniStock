import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import RemoveStock from '../components/RemoveStock';

const EditRemovedStockScreen = ({navigation, route}) => {
  return (
    <Fragment>
      <AppBar
        title={'Remove stock'}
        navigation={navigation}
        showBackButton={true}
      />
      <RemoveStock
        navigation={navigation}
        productRemovalUUID={route.params.productRemovalUUID}
      />
    </Fragment>
  );
};

export default EditRemovedStockScreen;
