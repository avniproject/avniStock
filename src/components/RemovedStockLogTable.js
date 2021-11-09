import React, {useCallback, useState} from 'react';
import {getService} from '../hooks/getService';
import _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import BadgeText from './BadgeText';
import RemoveStockService from '../service/RemoveStockService';
import StockLogRow from './StockLogRow';
import {useFocusEffect} from '@react-navigation/core';
import StockLohHeader from './StockLogHeader';
import {t} from '../service/i18n/messages';
import Colors from '../styles/Colors';

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
    <View style={{minHeight: 50}}>
      <BadgeText
        number={removedStockList.length}
        text={t('removedStockLogs')}
      />
      {removedStockList.length > 0 && (
        <View style={styles.container}>
          <StockLohHeader />
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
