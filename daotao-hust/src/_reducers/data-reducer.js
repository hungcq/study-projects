const initState = {
};

export function dataReducer(state = initState, action) {
  switch (action.type) {
    case 'RECEIVE_APP_DATA':
      return {
        ...action.appData
      };
    default:
      return state;
  }
}