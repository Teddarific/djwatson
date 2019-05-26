import { combineReducers } from 'redux';

import uriReducer from './uriReducer';

const rootReducer = combineReducers({
  uri: uriReducer,
});

export default rootReducer;
