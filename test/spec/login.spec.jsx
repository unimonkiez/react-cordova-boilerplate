import React from 'react';
import LoginInjector from 'inject-loader!src/containers/login.jsx';
import { renderIntoDocument } from 'test/helper/react.jsx';
import getReactReduxMock from 'test/mock/react-redux.js';

describe('Login', () => {
  let Login;
  let reactReduxMock;
  beforeEach(() => {
    reactReduxMock = getReactReduxMock();
    Login = LoginInjector({
      'react-redux': reactReduxMock
    });
  });
  it('renders without errors', done => {
    renderIntoDocument(<Login general={{}} credentials={{}} credentialsActions={{}} />, (renderError, { instance }) => {
      expect(instance).toBeTruthy();
      done();
    });
  });
  it('is surrounded with `connect`', () => {
    expect(reactReduxMock.connect).toHaveBeenCalled();
  });
});
