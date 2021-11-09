import React, {useCallback, useState} from 'react';
import {getService} from '../hooks/getService';
import _ from 'lodash';
import {DataTable} from 'react-native-paper';
import {View} from 'react-native';
import BadgeText from './BadgeText';
import RemoveStockService from '../service/RemoveStockService';
import StockLogRow from './StockLogRow';
import {useFocusEffect} from '@react-navigation/core';
import StockLohHeader from './StockLogHeader';
import {t} from '../service/i18n/messages';

export default function RemovedStockLogTable({
  productUUID,
  navigation,
  batchUUID,
}) {
  const [removedStockList, setRemovedStockList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const removedStocks = getService(
        RemoveStockService,
      ).getRemovedListForProductUUID(productUUID, batchUUID);
      setRemovedStockList(removedStocks);
      return () => {};
    }, [productUUID]),
  );

  const onEditPress = productRemovalUUID =>
    navigation.navigate('Edit Removed Stock', {productRemovalUUID});

  const renderEachRow = () => {
    return _.map(removedStockList, rs => (
      <StockLogRow
        key={rs.uuid}
        uuid={rs.uuid}
        quantity={rs.quantity}
        batch={rs.programEnrolment.batchNumber}
        date={rs.encounterDateTime}
        onEdit={onEditPress}
      />
    ));
  };

  return (
    <View style={{minHeight: 150}}>
      <BadgeText
        number={removedStockList.length}
        text={t('removedStockLogs')}
      />
      <DataTable>
        <StockLohHeader />
        {renderEachRow()}
      </DataTable>
    </View>
  );
}
