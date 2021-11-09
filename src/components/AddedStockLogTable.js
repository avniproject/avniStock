import React, {useCallback, useState} from 'react';
import {getService} from '../hooks/getService';
import StockService from '../service/StockService';
import _ from 'lodash';
import {View, StyleSheet} from 'react-native';
import BadgeText from './BadgeText';
import StockLogRow from './StockLogRow';
import {useFocusEffect} from '@react-navigation/core';
import Colors from '../styles/Colors';
import StockLogHeader from './StockLogHeader';

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
        batch={stock.batchNumber}
        date={stock.enrolmentDateTime}
        onEdit={onEditPress}
      />
    ));
  };

  return (
    <View style={{minHeight: 50}}>
      <BadgeText number={stocks.length} text={'addedStockLogs'} />
      {stocks.length > 0 && (
        <View style={styles.container}>
          <StockLogHeader />
          {renderEachRow()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.surface,
  },
});
