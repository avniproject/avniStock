import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {removeStockActions} from '../reducers/RemoveStockReducer';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';
import DateInput from './DateInput';
import BatchNumberDropdown from './BatchNumberDropdown';
import TextInput from './TextInput';
import _ from 'lodash';
import ProgramEncounter from '../models/transactional/ProgramEncounter';
import BottomActionButtons from './BottomActionButtons';

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
    //TODO: validate the sate before saving
    dispatch({type: removeStockActions.ON_SAVE});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Surface style={styles.container}>
        <DateInput
          label={'Date'}
          date={stock.encounterDateTime}
          onDateChange={date =>
            dispatch({type: removeStockActions.ON_DATE_CHANGE, date})
          }
        />
        <BatchNumberDropdown
          productBatchUUID={stock.programEnrolment.uuid}
          setProductBatchUUID={productBatchUUID =>
            dispatch({
              type: removeStockActions.ON_BATCH_NUMBER_CHANGE,
              productBatchUUID,
            })
          }
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
        />
      </Surface>
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
