import React, {useEffect, useState} from 'react';
import {getService} from '../hooks/getService';
import _ from 'lodash';
import {DataTable} from 'react-native-paper';
import {View} from 'react-native';
import BadgeText from './BadgeText';
import RemoveStockService from '../service/RemoveStockService';
import StockLogRow from './StockLogRow';

export default function RemovedStockLogTable({productUUID, navigation}) {
  const [removedStockList, setRemovedStockList] = useState([]);

  useEffect(() => {
    const removedStocks =
      getService(RemoveStockService).getRemovedListForProductUUID(productUUID);
    setRemovedStockList(removedStocks);
  }, [productUUID]);

  const onEditPress = productRemovalUUID =>
    navigation.navigate('Remove Stock', {productRemovalUUID});

  const renderEachRow = () => {
    return _.map(removedStockList, rs => (
      <StockLogRow
        uuid={rs.uuid}
        quantity={rs.quantity}
        date={rs.encounterDateTime}
        onEdit={onEditPress}
      />
    ));
  };

  return (
    <View style={{minHeight: 150}}>
      <BadgeText number={removedStockList.length} text={'Removed Stock Logs'} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Quantity</DataTable.Title>
          <DataTable.Title>Edit Record</DataTable.Title>
        </DataTable.Header>
        {renderEachRow()}
      </DataTable>
    </View>
  );
}
