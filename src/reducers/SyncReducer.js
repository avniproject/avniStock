const prefix = 'SYNC';

const syncActions = {
  PRE_SYNC: `${prefix}.PRE_SYNC`,
  POST_SYNC: `${prefix}.POST_SYNC`,
  ON_ERROR: `${prefix}.ON_ERROR`,
  ON_UPDATE: `${prefix}.ON_UPDATE`,
  ON_MESSAGE_CALLBACK: `${prefix}.ON_MESSAGE_CALLBACK`,
};

const initialState = {
  syncing: false,
  progress: 0,
  message: '',
  syncMessage: '',
  startSync: false,
};

const syncReducer = (state = initialState, action) => {
  function preSync(state) {
    const startTime = Date.now();
    return {...state, syncing: true, syncMessage: 'syncingData', startTime};
  }

  function postSync(state) {
    return {...state, syncing: false, startSync: false};
  }

  function onError(state) {
    return {...state, syncing: false};
  }

  function onUpdate(state, action) {
    return {
      ...state,
      progress: action.progress,
    };
  }

  function onMessageCallback(state, action) {
    return {
      ...state,
      message: action.message,
    };
  }

  switch (action.type) {
    case syncActions.PRE_SYNC:
      return preSync(state);
    case syncActions.POST_SYNC:
      return postSync(state);
    case syncActions.ON_ERROR:
      return onError(state);
    case syncActions.ON_UPDATE:
      return onUpdate(state, action);
    case syncActions.ON_MESSAGE_CALLBACK:
      return onMessageCallback(state, action);
    default:
      return state;
  }
};

export {syncActions, syncReducer};
