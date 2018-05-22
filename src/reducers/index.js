import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import role from './role';
import table from './table';

const rootReducer = combineReducers({
  routing: routerReducer,
  role,
  table
});

export default rootReducer;
