import { combineReducers } from 'redux';
import todos from './todos.js';
import credentials from './credentials.js';

export default combineReducers({
  todos,
  credentials
});
