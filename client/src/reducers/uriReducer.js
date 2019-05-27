import { ActionTypes } from '../actions';

const CountReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.SET_URI:
      return Object.assign({}, state, { uri: action.payload });
    case ActionTypes.GET_SONGS:
      return Object.assign({}, state, { songs: action.payload });
    case ActionTypes.GET_ORDERED:
      return Object.assign({}, state, { ordered: action.payload });
    case ActionTypes.CLEAR_DATA:
      return {};
    default:
      return state;
  }
};

export default CountReducer;
