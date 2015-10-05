import React, { Component } from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

import Login from '../containers/Login.jsx';

const finalCreateStore = compose(
  devTools(),
  persistState()
)(createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(combineReducers(require('../reducers')))
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <Login/> }
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

export default React.renderToString(React.createFactory(App)({}));
