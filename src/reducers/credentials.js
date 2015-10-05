import { CLEAR_CREDENTIALS, CHECK_CREDENTIALS, CHECK_CREDENTIALS_SUCCESS, CHECK_CREDENTIALS_FAILURE, ADD_CREDENTIALS, ADD_CREDENTIALS_SUCCESS, ADD_CREDENTIALS_FAILURE } from '../constants/CredentialsActionTypes';

const initialState = {
  authenticated: false,
  checkingToken: true,
  loggingIn: false,
  hint: false
};

export default function todos(state = initialState, action) {
  const { type, hint } = action;

  switch (type) {
    case CLEAR_CREDENTIALS:
      return initialState;
    case CHECK_CREDENTIALS:
      return {
        ...state,
        checkingToken: true
      };
    case CHECK_CREDENTIALS_SUCCESS:
      return {
        ...state,
        checkingToken: false,
        authenticated: true
      };
    case CHECK_CREDENTIALS_FAILURE:
      return {
        ...state,
        checkingToken: false
      };
    case ADD_CREDENTIALS:
      return {
        ...state,
        loggingIn: true
      };
    case ADD_CREDENTIALS_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loggingIn: false
      };
    case ADD_CREDENTIALS_FAILURE:
      return {
        ...state,
        authenticated: false,
        loggingIn: false,
        hint
      };
    default:
      return state;
  }
}
