import { spy } from 'sinon';

export default () => ({
  credentialsActions: spy(),
  clearCredentials: spy(),
  checkCredentials: spy(),
  checkCredentialsSucess: spy(),
  checkCredentialsFailure: spy(),
  addCredentials: spy(),
  addCredentialsSucess: spy(),
  addCredentialsFailure: spy()
});
