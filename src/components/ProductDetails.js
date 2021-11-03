import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import LabelValue from './LabelValue';
import Colors from '../styles/Colors';
import AddedStockLogTable from './AddedStockLogTable';
import Separator from './Separator';
import RemovedStockLogTable from './RemovedStockLogTable';
import {t} from '../service/i18n/messages';

export default function ProductDetails({product, navigation}) {
  const {name, restockLevel, uuid, totalStock} = product;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 50}}
    >
      <LabelValue label={t('name')} value={name} />
      <LabelValue label={t('restockLevel')} value={restockLevel} />
      <Separator style={styles.separator} />
      <AddedStockLogTable productUUID={uuid} navigation={navigation} />
      <Separator style={styles.separator} />
      <RemovedStockLogTable productUUID={uuid} navigation={navigation} />
      <Separator style={styles.separator} />
      <LabelValue label={t('currentStock')} value={totalStock} />
    </ScrollView>
  );
}

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
