import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'src/store/configure-store.js';
import DevTools from './dev-tools.jsx';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
          {__DEVTOOLS__ && <DevTools />}
        </div>
      </Provider>
    );
  }
}
if (__DEV__) {
  // Not needed or used in minified mode
  App.propTypes = {
    children: PropTypes.node.isRequired
  };
}
