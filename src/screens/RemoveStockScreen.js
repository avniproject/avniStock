import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import RemoveStock from '../components/RemoveStock';
import {t} from '../service/i18n/messages';

const RemoveStockScreen = ({navigation}) => {
  return (
    <Fragment>
      <AppBar
        title={t('removeStock')}
        navigation={navigation}
        showBackButton={true}
      />
      <RemoveStock navigation={navigation} />
    </Fragment>
  );
};

export default RemoveStockScreen;
