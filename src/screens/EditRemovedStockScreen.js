import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import RemoveStock from '../components/RemoveStock';

const EditRemovedStockScreen = ({navigation, route}) => {
  return (
    <Fragment>
      <AppBar
        title={'Edit removed stock'}
        navigation={navigation}
        showBackButton={true}
      />
      <RemoveStock
        navigation={navigation}
        productRemovalUUID={route.params.productRemovalUUID}
        disableProductDropdown={true}
      />
    </Fragment>
  );
};

export default EditRemovedStockScreen;
