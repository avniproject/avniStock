import AppBar from '../components/AppBar';
import React, {Fragment, useCallback, useState} from 'react';
import Individual from '../models/transactional/Individual';
import {useFocusEffect} from '@react-navigation/core';
import {getService} from '../hooks/getService';
import StockService from '../service/StockService';
import {ScrollView, StyleSheet} from 'react-native';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';
import LabelValue from '../components/LabelValue';
import RemovedStockLogTable from '../components/RemovedStockLogTable';
import General from '../utility/General';
import Separator from '../components/Separator';

const BatchDetailsScreen = ({navigation, route}) => {
  const {batchUUID} = route.params;
  const [batch, setBatch] = useState(Individual.createEmptyInstance);

  useFocusEffect(
    useCallback(() => {
      setBatch(getService(StockService).findByUUID(batchUUID));
      return () => {};
    }, [batchUUID]),
  );

  return (
    <Fragment>
      <AppBar title={'batchDetails'} navigation={navigation} showBackButton />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 50}}
      >
        <LabelValue label={t('batchNumber')} value={batch.batchNumber} />
        <LabelValue label={t('quantity')} value={batch.quantity} />
        <LabelValue
          label={t('expiryDate')}
          value={General.toDisplayDate(batch.expiryDate)}
        />
        <Separator style={styles.separator} />
        <RemovedStockLogTable batchUUID={batchUUID} navigation={navigation} />
        <LabelValue label={t('totalRemaining')} value={batch.totalRemaining} />
      </ScrollView>
    </Fragment>
  );
};

export default BatchDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: 16,
    flex: 1,
  },
  separator: {
    marginVertical: 15,
    height: 2,
    backgroundColor: '#00000012',
  },
});
