import React, {Fragment, useEffect} from 'react';
import AppBar from '../components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {productActions} from '../reducers/ProductReducer';
import ProductCard from '../components/ProductCard';
import {
  SafeAreaView,
  TouchableNativeFeedback,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Separator from '../components/Separator';
import Colors from '../styles/Colors';

const ProductListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {products} = useSelector(storeState => storeState.product);
  useEffect(() => {
    dispatch({type: productActions.ON_LOAD});
  }, [dispatch]);

  const renderProduct = ({item}) => (
    <TouchableNativeFeedback
      onPress={() => console.log(`${item.name} Product clicked`)}
    >
      <View>
        <ProductCard
          name={item.name}
          unit={item.unit}
          quantity={item.initialStock}
        />
      </View>
    </TouchableNativeFeedback>
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
