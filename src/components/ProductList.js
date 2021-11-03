import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Separator from './Separator';
import React from 'react';
import ProductCard from './ProductCard';
import Colors from '../styles/Colors';
import {Badge} from 'react-native-paper';
import {t} from '../service/i18n/messages';

export default function productList({products, navigation}) {
  const renderProduct = ({item}) => (
    <ProductCard
      name={item.name}
      unit={item.unit}
      quantity={item.totalStock}
      uuid={item.uuid}
      navigation={navigation}
    />
  );

  const renderHeader = () =>
    products.length === 0 ? null : (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.headerText}>{t('totalProducts')}</Text>
        <View>
          <Badge style={styles.badge}>{products.length}</Badge>
        </View>
      </View>
    );

  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.uuid}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
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
