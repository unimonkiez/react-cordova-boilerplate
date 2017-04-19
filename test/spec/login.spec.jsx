import React from 'react';
import LoginInjector from 'inject-loader!src/containers/login.jsx';
import reactHelper from 'test/helper/react.jsx';
import getReactReduxMock from 'test/mock/react-redux.js';
import getCredentialsActionsMock from 'test/mock/credentials-actions.js';
import { expect } from 'chai';

describe('Login', () => {
  let Login;
  let reactReduxMock;
  let credentialsActionsMock;

  beforeEach(() => {
    reactReduxMock = getReactReduxMock();
    credentialsActionsMock = getCredentialsActionsMock();
    Login = LoginInjector({
      'react-redux': reactReduxMock
    }).default;
  });

  it('renders without errors', done => {
    reactHelper.renderIntoDocument(
      <Login
        general={{}}
        credentials={{}}
        credentialsActions={credentialsActionsMock}
      />, ({ instance }) => {
      expect(instance).to.be.ok();
      done();
    });
  });
  it('is surrounded with `connect`', () => {
    expect(reactReduxMock.connect).to.have.been.calledOnce();
  });
});
