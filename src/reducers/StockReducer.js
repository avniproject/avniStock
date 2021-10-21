import StockState from '../state/StockState';
import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import ObservationHolderReducer from './ObservationHolderReducer';
import StockService from '../service/StockService';
import General from '../utility/General';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';

const prefix = 'Stock';

const stockActions = {
  ON_LOAD: `${prefix}_ON_LOAD`,
  ON_PRODUCT_CHANGE: `${prefix}_ON_PRODUCT_CHANGE`,
  ON_DATE_CHANGE: `${prefix}_ON_DATE_CHANGE`,
  ON_PRIMITIVE_OBS_CHANGE: `${prefix}_ON_PRIMITIVE_OBS_CHANGE`,
  ON_SAVE: `${prefix}_ON_SAVE`,
};

const initialState = new StockState();

const stockReducer = (state = initialState, action) => {
  function onProductChange(state, action) {
    const newState = state.clone();
    newState.stock.individual = getService(ProductService).findByUUID(
      action.productUUID,
    );
    newState.validateProduct();
    return newState;
  }

  function onDateChange(state, action) {
    const newState = state.clone();
    newState.stock.enrolmentDateTime = action.date;
    newState.validateDate();
    return newState;
  }

  function onSave(state) {
    state.validate();
    if (state.hasValidationError) {
      return state.clone();
    }
    General.logDebug('stockReducer', 'Saving the stock details');
    getService(StockService).saveOrUpdate(state);
    action.afterSaveCB();
    return state;
  }

  switch (action.type) {
    case stockActions.ON_LOAD:
      return StockState.onLoad(action.productUUID);
    case stockActions.ON_PRODUCT_CHANGE:
      return onProductChange(state, action);
    case stockActions.ON_DATE_CHANGE:
      return onDateChange(state, action);
    case stockActions.ON_PRIMITIVE_OBS_CHANGE: {
      const newState = ObservationHolderReducer.onPrimitiveValueChange(
        state,
        action,
      );
      const conceptName = action.payload.conceptName;
      if (conceptName === ProgramEnrolment.conceptNames.quantity) {
        newState.validateQuantity();
      } else if (conceptName === ProgramEnrolment.conceptNames.batchNumber) {
        newState.validateBatchNumber();
      } else if (conceptName === ProgramEnrolment.conceptNames.expiryDate) {
        newState.validateExpiryDate();
      }
      return newState;
    }

    case stockActions.ON_SAVE:
      return onSave(state);
    default:
      return state;
  }
};

export {stockActions, stockReducer};
