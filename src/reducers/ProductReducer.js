import {getService} from '../hooks/getService';
import ProductService from '../service/ProductService';

const prefix = 'Product';

const productActions = {
  ON_LOAD: `${prefix}_ON_LOAD`,
};

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productActions.ON_LOAD:
      const newState = {...state};
      newState.products = getService(ProductService).getSortedProductList();
      return newState;
    default:
      return state;
  }
};

export {productActions, productReducer};
