import React, {Fragment, useCallback} from 'react';
import AppBar from '../components/AppBar';
import {SafeAreaView, StyleSheet} from 'react-native';
import DateInput from '../components/DateInput';
import {Surface} from 'react-native-paper';
import TextInput from '../components/TextInput';
import _ from 'lodash';
import BottomActionButtons from '../components/BottomActionButtons';
import ProductDropdown from '../components/ProductDropdown';
import {stockActions} from '../reducers/StockReducer';
import {useDispatch, useSelector} from 'react-redux';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';
import {useFocusEffect} from '@react-navigation/core';

const AddStockScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.stock);
  const stock = state.stock;

  useFocusEffect(
    useCallback(() => {
      dispatch({type: stockActions.ON_LOAD});
      return () => {};
    }, [dispatch]),
  );

  const onCancel = () => {
    navigation.goBack();
  };

  const onSave = () => {
    //TODO: validate the sate before saving
    dispatch({type: stockActions.ON_SAVE});
    navigation.goBack();
  };

  return (
    <Fragment>
      <AppBar
        title={'Add stock'}
        navigation={navigation}
        showBackButton={true}
      />
      <SafeAreaView style={{flex: 1}}>
        <Surface style={styles.container}>
          <ProductDropdown
            productUUID={stock.individual.uuid}
            setProductUUID={productUUID =>
              dispatch({type: stockActions.ON_PRODUCT_CHANGE, productUUID})
            }
          />
          <DateInput
            label={'Date'}
            date={stock.enrolmentDateTime}
            onDateChange={date =>
              dispatch({type: stockActions.ON_DATE_CHANGE, date})
            }
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
export default AddStockScreen;
