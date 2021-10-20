import {getService} from '../hooks/getService';
import ObservationHolderReducer from './ObservationHolderReducer';
import General from '../utility/General';
import RemoveStockState from '../state/RemoveStockState';
import RemoveStockService from '../service/RemoveStockService';
import StockService from '../service/StockService';

const prefix = 'Remove_Stock';

const removeStockActions = {
  ON_LOAD: `${prefix}_ON_LOAD`,
  ON_BATCH_NUMBER_CHANGE: `${prefix}_ON_BATCH_NUMBER_CHANGE`,
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
    return newState;
  }

  function onDateChange(state, action) {
    const newState = state.clone();
    newState.stock.encounterDateTime = action.date;
    return newState;
  }

  function onSave(state) {
    General.logDebug('removeStockReducer', 'Saving the remove stock details');
    getService(RemoveStockService).saveOrUpdate(state);
    return state;
  }

  switch (action.type) {
    case removeStockActions.ON_LOAD:
      return RemoveStockState.onLoad(action.productUUID);
    case removeStockActions.ON_BATCH_NUMBER_CHANGE:
      return onBatchChange(state, action);
    case removeStockActions.ON_DATE_CHANGE:
      return onDateChange(state, action);
    case removeStockActions.ON_PRIMITIVE_OBS_CHANGE:
      return ObservationHolderReducer.onPrimitiveValueChange(state, action);
    case removeStockActions.ON_SAVE:
      return onSave(state);
    default:
      return state;
  }
};

export {removeStockActions, removeStockReducer};
