import { combineReducers } from 'redux';

import uriReducer from './uriReducer';

const rootReducer = combineReducers({
  data: uriReducer,
});

export default rootReducer;
