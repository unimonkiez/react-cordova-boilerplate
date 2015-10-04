import React, { Component } from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

import AppRoute from '../containers/AppRoute.jsx';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(combineReducers(require('../reducers')))
  );
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isReady: false,
      isLoggedIn: false
    };
  }
  handleDone(isLoggedIn) {
    this.setState({
      isReady: true,
      isLoggedIn: isLoggedIn
    });
  }
  render() {
    const { isLoggedIn, isReady } = this.state;

    return (
      <div>
        <Provider store={store}>
          {() => <AppRoute/> }
        </Provider>
        { __DEV__ && <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor}
                    visibleOnLoad={true} />
        </DebugPanel> }
      </div>
    );
  }
}

React.render(
  <App />,
  document.body
);
