import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import DevTools from './DevTools.jsx';

const store = configureStore();

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    return (
      <Provider store={store}>
        <div>
          { this.props.children }
          { __DEVTOOLS__ && <DevTools /> }
        </div>
      </Provider>
    );
  }
}
