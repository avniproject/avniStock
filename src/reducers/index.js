import {combineReducers} from 'redux';
import {loginReducer} from './LoginReducer';
import {syncReducer} from './SyncReducer';
import {editProductReducer} from './EditProductReducer';
import {stockReducer} from './StockReducer';
import {removeStockReducer} from './RemoveStockReducer';
import General from '../utility/General';

const appReducer = combineReducers({
  login: loginReducer,
  sync: syncReducer,
  editProduct: editProductReducer,
  stock: stockReducer,
  removeStock: removeStockReducer,
});

const rootReducer = (state, action) => {
  General.logDebug('Reducer', `Dispatching action ${action.type}`);
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
