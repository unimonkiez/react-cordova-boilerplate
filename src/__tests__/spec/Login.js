import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Login } from '../../containers/Login.jsx';

describe('Login', () => {
  it('renders', () => {
    const element = TestUtils.renderIntoDocument(<Login general={{}} credentials={{}} credentialsActions={{}}/>);
    expect(element).toBeTruthy();
  });
});
