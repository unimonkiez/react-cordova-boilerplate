import * as types from '../constants/CredentialsActionTypes';

export function clearCredentials() {
  return {
    type: types.CLEAR_CREDENTIALS
  };
}

export function addCredentials(token) {
  return {
    type: types.ADD_CREDENTIALS,
    token
  };
}
