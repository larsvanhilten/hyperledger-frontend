import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import role from './role';
import table from './table';
import loader from './loader';

const rootReducer = combineReducers({
  routing: routerReducer,
  role,
  table,
  loader
});

export default rootReducer;
