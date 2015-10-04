import { CLEAR_CREDENTIALS, ADD_CREDENTIALS } from '../constants/CredentialsActionTypes';

const stateFromLocalstorage = localStorage.credentials ? JSON.parse(localStorage.credentials) : {};
const initialState = { ...stateFromLocalstorage, valid: false };

export default function todos(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case CLEAR_CREDENTIALS:
      nextState = { valid: false };
      break;
    case ADD_CREDENTIALS:
      nextState = {
        token: action.token,
        valid: true
      };
      break;

    default:
      nextState = state;
      break;
  }
  localStorage.credentials = JSON.stringify(nextState);
  return nextState;
}
