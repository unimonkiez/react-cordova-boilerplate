import { combineReducers } from 'redux';
import todos from './todos';
import credentials from './credentials';

export default combineReducers({
  todos,
  credentials
});
