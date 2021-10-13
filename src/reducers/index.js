import {combineReducers} from 'redux';
import {loginReducer} from './LoginReducer';
import {syncReducer} from './SyncReducer';
import General from '../utility/General';

const appReducer = combineReducers({
  login: loginReducer,
  sync: syncReducer,
});

const rootReducer = (state, action) => {
  General.logDebug('Reducer', `Dispatching action ${action.type}`);
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
