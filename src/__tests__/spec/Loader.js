import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Loader from '../../containers/Loader.jsx';

describe('Loader', () => {
  let flag = false;

  it('renders', (done) => {
    const element = TestUtils.renderIntoDocument(<Loader onDone={() => {
      flag = true;
      done();
    }}/>);
    expect(element).toBeTruthy();
  });

  it('Finishes loading', () => {
    expect(flag).toBeTruthy();
  });
});
