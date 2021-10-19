import React, {Fragment, useEffect} from 'react';
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
import General from '../utility/General';
import moment from 'moment';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';

const AddStockScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.stock);
  const stock = state.stock;

  useEffect(() => {
    dispatch({type: stockActions.ON_LOAD});
  }, [dispatch]);

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
                  value: _.isNaN(quantity) ? 0 : _.floor(quantity),
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
            date={
              _.isNil(state.expiryDate)
                ? new Date()
                : moment(state.expiryDate).toDate()
            }
            onDateChange={date =>
              dispatch({
                type: stockActions.ON_PRIMITIVE_OBS_CHANGE,
                payload: {
                  value: General.toDisplayDate(date),
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
