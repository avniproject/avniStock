import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import Stock from '../components/Stock';
import {t} from '../service/i18n/messages';

const EditStockScreen = ({navigation, route}) => {
  return (
    <Fragment>
      <AppBar
        title={t('editStock')}
        navigation={navigation}
        showBackButton={true}
      />
      <Stock navigation={navigation} productUUID={route.params.productUUID} />
    </Fragment>
  );
};

export default EditStockScreen;
