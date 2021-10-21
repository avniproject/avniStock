import React, {Fragment, useEffect} from 'react';
import AppBar from '../components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {editProductActions} from '../reducers/EditProductReducer';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Colors from '../styles/Colors';
import TextInput from '../components/TextInput';
import _ from 'lodash';
import BottomActionButtons from '../components/BottomActionButtons';
import Individual from '../models/transactional/Individual';

const EditProductScreen = ({navigation, route}) => {
  const {productUUID} = route.params;
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.editProduct);

  useEffect(() => {
    dispatch({type: editProductActions.ON_LOAD, productUUID});
  }, [dispatch, productUUID]);

  const onCancel = () => {
    navigation.goBack();
  };

  const onSave = () => {
    const afterSaveCB = () => navigation.goBack();
    dispatch({type: editProductActions.ON_SAVE, afterSaveCB});
  };

  return (
    <Fragment>
      <AppBar
        title={'Edit Product'}
        navigation={navigation}
        showBackButton={true}
      />
      <SafeAreaView style={styles.container}>
        <TextInput label="Name" disabled={true} value={state.product.name} />
        <TextInput
          label="Initial Stock"
          returnKeyType="next"
          value={_.toString(state.initialStock)}
          onChangeText={initialStock =>
            dispatch({
              type: editProductActions.ON_PRIMITIVE_OBS_CHANGE,
              payload: {
                value: initialStock,
                conceptName: Individual.conceptNames.initialStock,
              },
            })
          }
          keyboardType="numeric"
          errorText={state.getErrorMessage(
            Individual.conceptNames.initialStock,
          )}
        />
        <TextInput
          label="Restock Level"
          value={_.toString(state.restockLevel)}
          onChangeText={restockLevel =>
            dispatch({
              type: editProductActions.ON_PRIMITIVE_OBS_CHANGE,
              payload: {
                value: restockLevel,
                conceptName: Individual.conceptNames.restockLevel,
              },
            })
          }
          keyboardType="numeric"
          errorText={state.getErrorMessage(
            Individual.conceptNames.restockLevel,
          )}
        />
        <TextInput
          label="Current Stock"
          disabled={true}
          value={_.toString(state.totalStock)}
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
