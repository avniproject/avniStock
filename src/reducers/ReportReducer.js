const prefix = 'REPORT';

const reportActions = {
  ON_LOAD: `${prefix}.ON_LOAD`,
  ON_TAB_CHANGE: `${prefix}.ON_TAB_CHANGE`,
};

const reports = Object.freeze({
  restock: 'Restock Needed',
  expired: 'Expired',
});

const initialState = {
  tabs: Object.values(reports),
  currentTab: reports.restock,
};

const reportReducer = (state = initialState, action) => {
  function onTabChange(state, action) {
    const newState = {...state};
    newState.currentTab = action.tab;
    return newState;
  }

  switch (action.type) {
    case reportActions.ON_LOAD:
      return {...state};
    case reportActions.ON_TAB_CHANGE:
      return onTabChange(state, action);
    default:
      return state;
  }
};

export {reportActions, reportReducer, reports};
