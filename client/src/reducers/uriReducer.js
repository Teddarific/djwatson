import { ActionTypes } from '../actions';

const CountReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.SET_URI:
      return Object.assign({}, state, { uri: action.payload });
    default:
      return state;
  }
};

export default CountReducer;
