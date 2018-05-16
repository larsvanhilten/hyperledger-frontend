import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import role from './role';

const rootReducer = combineReducers({
  routing: routerReducer,
  role
});

export default rootReducer;
