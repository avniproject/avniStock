import React, {Fragment, useCallback} from 'react';
import AppBar from '../components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';
import {removeStockActions} from '../reducers/RemoveStockReducer';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';
import DateInput from '../components/DateInput';
import TextInput from '../components/TextInput';
import _ from 'lodash';
import BottomActionButtons from '../components/BottomActionButtons';
import BatchNumberDropdown from '../components/BatchNumberDropdown';
import ProgramEncounter from '../models/transactional/ProgramEncounter';

const RemoveStockScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.removeStock);
  const stock = state.stock;

  useFocusEffect(
    useCallback(() => {
      dispatch({type: removeStockActions.ON_LOAD});
      return () => {};
    }, [dispatch]),
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
    <Fragment>
      <AppBar
        title={'Remove stock'}
        navigation={navigation}
        showBackButton={true}
      />
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
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});
export default RemoveStockScreen;
