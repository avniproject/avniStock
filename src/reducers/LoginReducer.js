import _ from 'lodash';
import beanRegistry from '../framework/bean/BeanRegistry';
import AuthService from '../service/AuthService';
import General from '../utility/General';

const prefix = 'LOGIN';

const loginActions = {
  ON_USER_ID_CHANGE: `${prefix}_ON_USER_ID_CHANGE`,
  ON_PASSWORD_CHANGE: `${prefix}_ON_PASSWORD_CHANGE`,
  ON_LOGIN_START: `${prefix}_ON_LOGIN_START`,
  ON_ERROR: `${prefix}_ON_ERROR`,
};

const initialState = {
  loggedInUser: '',
  userId: '',
  password: '',
  loggingIn: false,
  loginError: '',
  loginSuccess: false,
};

const loginReducer = (state = initialState, action) => {
  function onUserIdChange(state, action) {
    return _.assignIn({}, state, {
      userId: action.userId.trim(),
      loginError: '',
    });
  }

  function onPasswordChange(state, action) {
    return _.assignIn({}, state, {
      password: action.password.trim(),
      loginError: '',
    });
  }

  function onLoginStart(state, action) {
    const newState = _.assignIn({}, state, {
      loggingIn: true,
      loginError: '',
      loginSuccess: false,
    });
    const {success, resetPassword, failure} = action.nextSteps;
    beanRegistry
      .getService(AuthService)
      .authenticate(state.userId, state.password)
      .then(response => {
        if (response.status === 'LOGIN_SUCCESS') {
          success();
          return newState;
        }
        if (response.status === 'NEWPASSWORD_REQUIRED') {
          resetPassword(response.user);
          return newState;
        }
        General.logError('Unreachable code');
      })
      .catch(error => {
        General.logError('LoginActions', error);
        const loginError = _.includes(error.message, 'Network request failed')
          ? error.message.concat(
              '. Network is slow or disconnected. Please check internet connection',
            )
          : `${error.authErrCode}. ${_.last(_.split(error.message, ':'))}`;
        failure(loginError);
      });
    return newState;
  }

  function onError(state, action) {
    return _.assignIn({}, state, {
      loggingIn: false,
      loginError: action.error,
      loginSuccess: false,
    });
  }

  switch (action.type) {
    case loginActions.ON_USER_ID_CHANGE:
      return onUserIdChange(state, action);
    case loginActions.ON_PASSWORD_CHANGE:
      return onPasswordChange(state, action);
    case loginActions.ON_LOGIN_START:
      return onLoginStart(state, action);
    case loginActions.ON_ERROR:
      return onError(state, action);
    default:
      return state;
  }
};

export {loginActions, loginReducer};
