import React, {useCallback, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {getService} from '../hooks/getService';
import StockService from '../service/StockService';
import _ from 'lodash';
import {View} from 'react-native';
import BadgeText from './BadgeText';
import StockLogRow from './StockLogRow';
import {useFocusEffect} from '@react-navigation/core';

export default function AddedStockLogTable({productUUID, navigation}) {
  const [stocks, setStocks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const stocks =
        getService(StockService).getStocksByProductUUID(productUUID);
      setStocks(stocks);
      return () => {};
    }, [productUUID]),
  );

  const onEditPress = productUUID =>
    navigation.navigate('Edit Stock', {productUUID});

  const renderEachRow = () => {
    return _.map(stocks, stock => (
      <StockLogRow
        key={stock.uuid}
        uuid={stock.uuid}
        quantity={stock.quantity}
        date={stock.enrolmentDateTime}
        onEdit={onEditPress}
      />
    ));
  };

  return (
    <View style={{minHeight: 150}}>
      <BadgeText number={stocks.length} text={'Added Stock Logs'} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Quantity</DataTable.Title>
          <DataTable.Title numeric>Edit Record</DataTable.Title>
        </DataTable.Header>
        {renderEachRow()}
      </DataTable>
    </View>
  );
}
