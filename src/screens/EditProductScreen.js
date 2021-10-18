import React, {Fragment, useEffect, useCallback} from 'react';
import AppBar from '../components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {editProductActions} from '../reducers/EditProductReducer';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Colors from '../styles/Colors';
import TextInput from '../components/TextInput';
import _ from 'lodash';
import BottomActionButtons from '../components/BottomActionButtons';
import {useFocusEffect} from '@react-navigation/native';

const EditProductScreen = ({navigation, route}) => {
  const {productUUID} = route.params;
  const dispatch = useDispatch();
  const product = useSelector(storeState => storeState.editProduct);

  useEffect(() => {
    dispatch({type: editProductActions.ON_LOAD, productUUID});
  }, [dispatch, productUUID]);

  const onCancel = () => {
    navigation.goBack();
  };

  const onSave = () => {
    dispatch({type: editProductActions.ON_SAVE});
    navigation.goBack();
  };

  return (
    <Fragment>
      <AppBar
        title={'Edit Product'}
        navigation={navigation}
        showBackButton={true}
      />
      <SafeAreaView style={styles.container}>
        <TextInput label="Name" disabled={true} value={product.name} />
        <TextInput
          label="Initial Stock"
          returnKeyType="next"
          value={_.toString(product.initialStock)}
          onChangeText={initialStock =>
            dispatch({
              type: editProductActions.ON_INITIAL_STOCK_CHANGE,
              initialStock,
            })
          }
          keyboardType="numeric"
        />
        <TextInput
          label="Restock Level"
          value={_.toString(product.restockLevel)}
          onChangeText={restockLevel =>
            dispatch({
              type: editProductActions.ON_RESTOCK_LEVEL_CHANGE,
              restockLevel,
            })
          }
          keyboardType="numeric"
        />
        <TextInput
          label="Current Stock"
          disabled={true}
          value={_.toString(product.totalStock)}
        />
        <View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            height: 90,
            bottom: 90,
          }}
        />
      </SafeAreaView>
      <BottomActionButtons onSave={onSave} onCancel={onCancel} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: 16,
    flex: 1,
  },
});

export default EditProductScreen;
