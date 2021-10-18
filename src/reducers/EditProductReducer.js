import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';
import EditProductState from '../state/EditProductState';
import _ from 'lodash';
import General from '../utility/General';
import Individual from '../models/transactional/Individual';
import EntityService from '../service/EntityService';
import Concept from '../models/reference/Concept';

const prefix = 'Edit_product';

const editProductActions = {
  ON_LOAD: `${prefix}_ON_LOAD`,
  ON_INITIAL_STOCK_CHANGE: `${prefix}_ON_INITIAL_STOCK_CHANGE`,
  ON_RESTOCK_LEVEL_CHANGE: `${prefix}_ON_RESTOCK_LEVEL_CHANGE`,
  ON_SAVE: `${prefix}_ON_SAVE`,
};

const initialState = new EditProductState('', '', []);

const editProductReducer = (state = initialState, action) => {
  function onInitialStockChange(state, action) {
    const newState = state.clone();
    const initialStock = _.floor(action.initialStock);
    const initialStockConcept = getService(EntityService).findByName(
      Individual.conceptNames.initialStock,
      Concept.schema.name,
    );
    newState.observationHolder.addOrUpdatePrimitiveObs(
      initialStockConcept,
      initialStock,
    );
    newState.totalStock = initialStock;
    return newState;
  }

  function onRestockChange(state, action) {
    const newState = state.clone();
    const restockLevel = _.floor(action.restockLevel);
    const restockLevelConcept = getService(EntityService).findByName(
      Individual.conceptNames.restockLevel,
      Concept.schema.name,
    );
    newState.observationHolder.addOrUpdatePrimitiveObs(
      restockLevelConcept,
      restockLevel,
    );
    return newState;
  }

  function onSave(state) {
    General.logDebug('editProductReducer', 'Updating the product details');
    getService(ProductService).updateProduct(state);
    return state;
  }

  switch (action.type) {
    case editProductActions.ON_LOAD:
      const product = getService(ProductService).findByUUID(action.productUUID);
      return EditProductState.onLoad(product);
    case editProductActions.ON_INITIAL_STOCK_CHANGE:
      return onInitialStockChange(state, action);
    case editProductActions.ON_RESTOCK_LEVEL_CHANGE:
      return onRestockChange(state, action);
    case editProductActions.ON_SAVE:
      return onSave(state);
    default:
      return state;
  }
};

export {editProductActions, editProductReducer};
