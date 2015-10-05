import * as types from '../constants/CredentialsActionTypes';

export function clearCredentials() {
  return {
    type: types.CLEAR_CREDENTIALS
  };
}
export function checkCredentials() {
  return {
    type: types.CHECK_CREDENTIALS
  };
}
export function checkCredentialsSucess() {
  return {
    type: types.CHECK_CREDENTIALS_SUCCESS
  };
}
export function checkCredentialsFailure() {
  return {
    type: types.CHECK_CREDENTIALS_FAILURE
  };
}
export function addCredentials() {
  return {
    type: types.ADD_CREDENTIALS
  };
}
export function addCredentialsSucess() {
  return {
    type: types.ADD_CREDENTIALS_SUCCESS
  };
}
export function addCredentialsFailure(hint) {
  return {
    type: types.ADD_CREDENTIALS_FAILURE,
    hint
  };
}
