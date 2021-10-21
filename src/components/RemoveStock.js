import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {removeStockActions} from '../reducers/RemoveStockReducer';
import {SafeAreaView, StyleSheet} from 'react-native';
import DateInput from './DateInput';
import BatchNumberDropdown from './BatchNumberDropdown';
import TextInput from './TextInput';
import _ from 'lodash';
import ProgramEncounter from '../models/transactional/ProgramEncounter';
import BottomActionButtons from './BottomActionButtons';
import RemoveStockState from '../state/RemoveStockState';
import Colors from '../styles/Colors';
import ProductDropdown from './ProductDropdown';

export default function RemoveStock({
  navigation,
  productRemovalUUID,
  disableProductDropdown,
}) {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.removeStock);
  const stock = state.stock;
  useFocusEffect(
    useCallback(() => {
      dispatch({type: removeStockActions.ON_LOAD, productRemovalUUID});
      return () => {};
    }, [productRemovalUUID, dispatch]),
  );

  const onCancel = () => {
    navigation.goBack();
  };

  const onSave = () => {
    const afterSaveCB = () => navigation.goBack();
    dispatch({type: removeStockActions.ON_SAVE, afterSaveCB});
  };

  return (
    <SafeAreaView style={styles.container}>
      <DateInput
        label={'Date'}
        date={stock.encounterDateTime}
        onDateChange={date =>
          dispatch({type: removeStockActions.ON_DATE_CHANGE, date})
        }
        errorText={state.getErrorMessage(
          RemoveStockState.staticIds.encounterDate,
        )}
      />
      <ProductDropdown
        productUUID={stock.programEnrolment.individual.uuid}
        setProductUUID={productUUID =>
          dispatch({type: removeStockActions.ON_PRODUCT_CHANGE, productUUID})
        }
        errorText={state.getErrorMessage(RemoveStockState.staticIds.product)}
        disabled={disableProductDropdown}
      />
      <BatchNumberDropdown
        productUUID={stock.programEnrolment.individual.uuid}
        productBatchUUID={stock.programEnrolment.uuid}
        setProductBatchUUID={productBatchUUID =>
          dispatch({
            type: removeStockActions.ON_BATCH_NUMBER_CHANGE,
            productBatchUUID,
          })
        }
        errorText={state.getErrorMessage(
          RemoveStockState.staticIds.batchNumber,
        )}
      />
      <TextInput
        label="Quantity"
        returnKeyType="next"
        value={_.toString(state.quantity)}
        onChangeText={quantity =>
          dispatch({
            type: removeStockActions.ON_PRIMITIVE_OBS_CHANGE,
            payload: {
              value: quantity,
              conceptName: ProgramEncounter.conceptNames.quantity,
            },
          })
        }
        keyboardType="numeric"
        errorText={state.getErrorMessage(
          ProgramEncounter.conceptNames.quantity,
        )}
      />
      <BottomActionButtons onCancel={onCancel} onSave={onSave} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    flex: 1,
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});
