import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getService} from '../hooks/getService';
import {FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';
import StockService from '../service/StockService';
import ProductCard from './ProductCard';
import General from '../utility/General';
import Separator from './Separator';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';
import {Badge, Chip} from 'react-native-paper';
import _ from 'lodash';
import moment from 'moment';

const chipToDateOptions = [
  {title: 'tillToday', date: moment()},
  {title: 'next15Days', date: moment().add(15, 'days')},
  {title: 'next30Days', date: moment().add(30, 'days')},
  {title: 'next60Days', date: moment().add(60, 'days')},
  {title: 'next90Days', date: moment().add(90, 'days')},
];

export default function ExpiredReport({navigation}) {
  const [expiredBatches, setExpiredBatches] = React.useState([]);
  const [selectedChip, setSelectedChip] = React.useState('tillToday');

  useFocusEffect(
    useCallback(() => {
      setSelectedChip('tillToday');
      onDateFilterPress(moment());
      return () => {};
    }, []),
  );

  const onDateFilterPress = date => {
    const expiredBatches = getService(StockService).getExpiredBatchAsOf(date);
    setExpiredBatches(expiredBatches);
  };

  const onChipPress = (title, date) => {
    setSelectedChip(title);
    onDateFilterPress(date);
  };

  const renderBatch = ({item}) => {
    const moreInfo = [
      `${t('batchNumber')} : ${item.batchNumber}`,
      `${t('expiryDate')} : ${General.toDisplayDate(item.expiryDate)}`,
    ];

    return (
      <ProductCard
        name={item.individual.name}
        uuid={item.individual.uuid}
        moreProductInfo={moreInfo}
        navigation={navigation}
        disableEdit={true}
        customCardPress={_.noop}
      />
    );
  };

  const renderHeader = () =>
    expiredBatches.length === 0 ? null : (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.headerText}>{t('expiredBatches')}</Text>
        <View>
          <Badge style={styles.badge}>{expiredBatches.length}</Badge>
        </View>
      </View>
    );

  return (
    <View style={{paddingBottom: 90}}>
      <View style={{height: 40, marginTop: 5}}>
        <ScrollView horizontal>
          {_.map(chipToDateOptions, ({title, date}) => (
            <Chip
              key={title}
              selected={title === selectedChip}
              selectedColor={Colors.primary}
              onPress={() => onChipPress(title, date)}
            >
              {t(title)}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={expiredBatches}
        renderItem={renderBatch}
        keyExtractor={item => item.uuid}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 90,
  },
  headerText: {
    color: Colors.text,
    opacity: 0.8,
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  badge: {
    backgroundColor: Colors.background,
    color: Colors.lightBlack,
    fontWeight: 'bold',
  },
});
