import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import EditProductState from '../state/EditProductState';
import General from '../utility/General';
import ObservationHolderReducer from './ObservationHolderReducer';

const prefix = 'Edit_product';

const editProductActions = {
  ON_LOAD: `${prefix}_ON_LOAD`,
  ON_PRIMITIVE_OBS_CHANGE: `${prefix}_ON_PRIMITIVE_OBS_CHANGE`,
  ON_SAVE: `${prefix}_ON_SAVE`,
};

const initialState = new EditProductState();

const editProductReducer = (state = initialState, action) => {
  function onSave(state) {
    General.logDebug('editProductReducer', 'Updating the product details');
    getService(ProductService).updateProduct(state);
    return state;
  }

  switch (action.type) {
    case editProductActions.ON_LOAD:
      const product = getService(ProductService).findByUUID(action.productUUID);
      return EditProductState.onLoad(product);
    case editProductActions.ON_PRIMITIVE_OBS_CHANGE:
      return ObservationHolderReducer.onPrimitiveValueChange(state, action);
    case editProductActions.ON_SAVE:
      return onSave(state);
    default:
      return state;
  }
};

export {editProductActions, editProductReducer};
