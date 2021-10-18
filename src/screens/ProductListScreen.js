import React, {Fragment, useCallback} from 'react';
import AppBar from '../components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {productActions} from '../reducers/ProductReducer';
import ProductCard from '../components/ProductCard';
import {SafeAreaView, FlatList, StyleSheet, Text} from 'react-native';
import Separator from '../components/Separator';
import Colors from '../styles/Colors';
import {useFocusEffect} from '@react-navigation/core';

const ProductListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {products} = useSelector(storeState => storeState.product);

  useFocusEffect(
    useCallback(() => {
      dispatch({type: productActions.ON_LOAD});
      return () => {};
    }, [dispatch]),
  );

  const renderProduct = ({item}) => (
    <ProductCard
      name={item.name}
      unit={item.unit}
      quantity={item.totalStock}
      uuid={item.uuid}
      navigation={navigation}
    />
  );

  const renderHeader = () => (
    <Text style={styles.headerText}>Total : {products.length}</Text>
  );

  return (
    <Fragment>
      <AppBar title={'Product List'} navigation={navigation} />
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
    </Fragment>
  );
};

export default ProductListScreen;

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
});
