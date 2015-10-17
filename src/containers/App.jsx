import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

const finalCreateStore = compose(
  devTools(),
  persistState(__CLIENT__ ? window.location.href.match(/[?&]debug_session=([^&]+)\b/) : undefined)
)(createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(combineReducers(require('../reducers')))
  );
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          { this.props.children }
        </Provider>
        { __DEVTOOLS__ && <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor}
                    visibleOnLoad={true} />
        </DebugPanel> }
      </div>
    );
  }
}