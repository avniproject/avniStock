import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import RemoveStock from '../components/RemoveStock';
import {t} from '../service/i18n/messages';

const EditRemovedStockScreen = ({navigation, route}) => {
  return (
    <Fragment>
      <AppBar
        title={t('editRemovedStock')}
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
