import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {removeStockActions} from '../reducers/RemoveStockReducer';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import DateInput from './DateInput';
import BatchNumberDropdown from './BatchNumberDropdown';
import TextInput from './TextInput';
import _ from 'lodash';
import ProgramEncounter from '../models/transactional/ProgramEncounter';
import BottomActionButtons from './BottomActionButtons';
import RemoveStockState from '../state/RemoveStockState';
import Colors from '../styles/Colors';
import ProductDropdown from './ProductDropdown';
import {Surface} from 'react-native-paper';
import {t} from '../service/i18n/messages';

export default function RemoveStock({navigation, productRemovalUUID}) {
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
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.surface}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        keyboardShouldPersistTaps={'handled'}
      >
        <Surface style={styles.container}>
          <DateInput
            label={'date'}
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
              dispatch({
                type: removeStockActions.ON_PRODUCT_CHANGE,
                productUUID,
              })
            }
            errorText={state.getErrorMessage(
              RemoveStockState.staticIds.product,
            )}
            disabled={state.editFlow}
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
            disabled={state.editFlow}
          />
          <TextInput
            label={t('quantity')}
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
