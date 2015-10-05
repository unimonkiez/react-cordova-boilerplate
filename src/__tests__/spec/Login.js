import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Login from '../../containers/Login.jsx';

describe('Login', () => {
  let flag = false;

  it('renders', () => {
    const element = TestUtils.renderIntoDocument(<Login/>);
    expect(element).toBeTruthy();
  });
});
