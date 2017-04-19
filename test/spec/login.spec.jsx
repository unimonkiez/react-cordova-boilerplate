import React from 'react';
import LoginInjector from 'inject-loader!src/containers/login.jsx';
import reactHelper from 'test/helper/react.jsx';
import getReactReduxMock from 'test/mock/react-redux.js';
import { expect } from 'chai';

describe('Login', () => {
  let Login;
  let reactReduxMock;
  beforeEach(() => {
    reactReduxMock = getReactReduxMock();
    Login = LoginInjector({
      'react-redux': reactReduxMock
    }).default;
  });
  it('renders without errors', done => {
    reactHelper.renderIntoDocument(<Login general={{}} credentials={{}} credentialsActions={{}} />, ({ instance }) => {
      expect(instance).toBeTruthy();
      done();
    });
  });
  it('is surrounded with `connect`', () => {
    expect(reactReduxMock.connect).toHaveBeenCalled();
  });
});
