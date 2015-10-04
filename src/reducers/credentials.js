import { CLEAR_CREDENTIALS, ADD_CREDENTIALS } from '../constants/CredentialsActionTypes';

const stateFromLocalstorage = __CLIENT__ && localStorage.credentials ? JSON.parse(localStorage.credentials) : {};
const initialState = { ...stateFromLocalstorage, valid: stateFromLocalstorage.time >= Date.now() - 1000 * 60 };

export default function credentials(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case CLEAR_CREDENTIALS:
      nextState = { valid: false };
      break;
    case ADD_CREDENTIALS:
      nextState = {
        token: action.token,
        valid: true,
        time: Date.now()
      };
      break;

    default:
      nextState = state;
      break;
  }
  localStorage.credentials = JSON.stringify(nextState);
  return nextState;
}
