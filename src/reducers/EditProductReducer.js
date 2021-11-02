import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import EditProductState from '../state/EditProductState';
import General from '../utility/General';
import ObservationHolderReducer from './ObservationHolderReducer';
import Individual from '../models/transactional/Individual';

const prefix = 'Edit_product';

const editProductActions = {
  ON_LOAD: `${prefix}_ON_LOAD`,
  ON_PRIMITIVE_OBS_CHANGE: `${prefix}_ON_PRIMITIVE_OBS_CHANGE`,
  ON_SAVE: `${prefix}_ON_SAVE`,
};

const initialState = new EditProductState();

const editProductReducer = (state = initialState, action) => {
  function onSave(state, action) {
    state.validate();
    if (state.hasValidationError) {
      return state.clone();
    }
    General.logDebug('editProductReducer', 'Updating the product details');
    getService(ProductService).updateProduct(state);
    action.afterSaveCB();
    return state;
  }

  switch (action.type) {
    case editProductActions.ON_LOAD:
      const product = getService(ProductService).findByUUID(action.productUUID);
      return EditProductState.onLoad(product);
    case editProductActions.ON_PRIMITIVE_OBS_CHANGE: {
      const newState = ObservationHolderReducer.onPrimitiveValueChange(
        state,
        action,
      );
      const conceptName = action.payload.conceptName;
      if (conceptName === Individual.conceptNames.restockLevel) {
        newState.validateRestockLevel();
      }
      return newState;
    }
    case editProductActions.ON_SAVE:
      return onSave(state, action);
    default:
      return state;
  }
};

export {editProductActions, editProductReducer};
