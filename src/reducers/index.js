import {combineReducers} from 'redux';
import {loginReducer} from './LoginReducer';
import {syncReducer} from './SyncReducer';
import {productReducer} from './ProductReducer';
import General from '../utility/General';

const appReducer = combineReducers({
  login: loginReducer,
  sync: syncReducer,
  product: productReducer,
});

const rootReducer = (state, action) => {
  General.logDebug('Reducer', `Dispatching action ${action.type}`);
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
