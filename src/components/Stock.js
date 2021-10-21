import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {stockActions} from '../reducers/StockReducer';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Surface} from 'react-native-paper';
import DateInput from './DateInput';
import ProductDropdown from './ProductDropdown';
import TextInput from './TextInput';
import _ from 'lodash';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';
import BottomActionButtons from './BottomActionButtons';
import StockState from '../state/StockState';
import Colors from '../styles/Colors';

export default function Stock({navigation, productUUID}) {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.stock);
  const stock = state.stock;

  useFocusEffect(
    useCallback(() => {
      dispatch({type: stockActions.ON_LOAD, productUUID});
      return () => {};
    }, [dispatch, productUUID]),
  );

  const onCancel = () => {
    navigation.goBack();
  };

  const onSave = () => {
    const afterSaveCB = () => navigation.goBack();
    dispatch({type: stockActions.ON_SAVE, afterSaveCB});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.surface}}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Surface style={styles.container}>
          <DateInput
            label={'Date'}
            date={stock.enrolmentDateTime}
            onDateChange={date =>
              dispatch({type: stockActions.ON_DATE_CHANGE, date})
            }
            errorText={state.getErrorMessage(
              StockState.staticIds.enrolmentDate,
            )}
          />
          <ProductDropdown
            productUUID={stock.individual.uuid}
            setProductUUID={productUUID =>
              dispatch({type: stockActions.ON_PRODUCT_CHANGE, productUUID})
            }
            errorText={state.getErrorMessage(StockState.staticIds.product)}
          />
          <TextInput
            label="Quantity"
            returnKeyType="next"
            value={_.toString(state.quantity)}
            onChangeText={quantity =>
              dispatch({
                type: stockActions.ON_PRIMITIVE_OBS_CHANGE,
                payload: {
                  value: quantity,
                  conceptName: ProgramEnrolment.conceptNames.quantity,
                },
              })
            }
            keyboardType="numeric"
            errorText={state.getErrorMessage(
              ProgramEnrolment.conceptNames.quantity,
            )}
          />
          <TextInput
            label="Batch Number"
            returnKeyType="next"
            value={state.batchNumber}
            onChangeText={batchNumber =>
              dispatch({
                type: stockActions.ON_PRIMITIVE_OBS_CHANGE,
                payload: {
                  value: batchNumber,
                  conceptName: ProgramEnrolment.conceptNames.batchNumber,
                },
              })
            }
            errorText={state.getErrorMessage(
              ProgramEnrolment.conceptNames.batchNumber,
            )}
          />
          <DateInput
            label={'Expiry Date'}
            date={_.isNil(state.expiryDate) ? new Date() : state.expiryDate}
            onDateChange={date =>
              dispatch({
                type: stockActions.ON_PRIMITIVE_OBS_CHANGE,
                payload: {
                  value: date,
                  conceptName: ProgramEnrolment.conceptNames.expiryDate,
                },
              })
            }
            errorText={state.getErrorMessage(
              ProgramEnrolment.conceptNames.expiryDate,
            )}
          />
        </Surface>
      </ScrollView>
      <BottomActionButtons onCancel={onCancel} onSave={onSave} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});
