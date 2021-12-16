import {getService} from '../hooks/getService';
import ObservationHolderReducer from './ObservationHolderReducer';
import General from '../utility/General';
import RemoveStockState from '../state/RemoveStockState';
import RemoveStockService from '../service/RemoveStockService';
import StockService from '../service/StockService';
import ProgramEncounter from '../models/transactional/ProgramEncounter';
import ProductService from '../service/ProductService';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';

const prefix = 'Remove_Stock';

const removeStockActions = {
  ON_LOAD: `${prefix}_ON_LOAD`,
  ON_BATCH_NUMBER_CHANGE: `${prefix}_ON_BATCH_NUMBER_CHANGE`,
  ON_PRODUCT_CHANGE: `${prefix}_ON_PRODUCT_CHANGE`,
  ON_DATE_CHANGE: `${prefix}_ON_DATE_CHANGE`,
  ON_PRIMITIVE_OBS_CHANGE: `${prefix}_ON_PRIMITIVE_OBS_CHANGE`,
  ON_SAVE: `${prefix}_ON_SAVE`,
};

const initialState = new RemoveStockState();

const removeStockReducer = (state = initialState, action) => {
  function onBatchChange(state, action) {
    const newState = state.clone();
    newState.stock.programEnrolment = getService(StockService).findByUUID(
      action.productBatchUUID,
    );
    newState.validateBatchNumber();
    return newState;
  }

  function onProductChange(state, action) {
    const newState = state.clone();
    newState.stock.programEnrolment = ProgramEnrolment.createEmptyInstance();
    newState.stock.programEnrolment.individual = getService(
      ProductService,
    ).findByUUID(action.productUUID);
    newState.validateProduct();
    return newState;
  }

  function onDateChange(state, action) {
    const newState = state.clone();
    newState.stock.encounterDateTime = action.date;
    newState.validateDate();
    return newState;
  }

  function onSave(state) {
    state.validate();
    if (state.hasValidationError) {
      return state.clone();
    }
    General.logDebug('removeStockReducer', 'Saving the remove stock details');
    getService(RemoveStockService).saveOrUpdate(state);
    action.afterSaveCB();
    return state;
  }

  switch (action.type) {
    case removeStockActions.ON_LOAD:
      return RemoveStockState.onLoad(action.productRemovalUUID);
    case removeStockActions.ON_BATCH_NUMBER_CHANGE:
      return onBatchChange(state, action);
    case removeStockActions.ON_PRODUCT_CHANGE:
      return onProductChange(state, action);
    case removeStockActions.ON_DATE_CHANGE:
      return onDateChange(state, action);
    case removeStockActions.ON_PRIMITIVE_OBS_CHANGE: {
      const newState = ObservationHolderReducer.onPrimitiveValueChange(
        state,
        action,
      );
      const conceptName = action.payload.conceptName;
      if (conceptName === ProgramEncounter.conceptNames.quantity) {
        newState.validateQuantity();
      } else if (
        conceptName === ProgramEncounter.conceptNames.reasonForRemoval
      ) {
        newState.observationHolder._removeExistingObs(
          ProgramEncounter.conceptNames.transferLocation,
        );
        newState.validateReasonForRemoval();
      } else if (
        conceptName === ProgramEncounter.conceptNames.transferLocation
      ) {
        newState.validateTransferLocation();
      }
      return newState;
    }
    case removeStockActions.ON_SAVE:
      return onSave(state);
    default:
      return state;
  }
};

export {removeStockActions, removeStockReducer};
