import React, { Component, PropTypes } from 'react';
import Router, {Route, Redirect} from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import Login from './Login.jsx';
import TodoApp from './TodoApp.jsx';

export default class AppRoute extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  };

  defaultProps() {
    return {
      isLoggedIn: false
    };
  }
  render() {
    let component;
    if (this.props.isLoggedIn) {
      component = (
        <Router history={history}>
      	  <Route path="/" component={TodoApp}/>
      	  <Redirect from="*" to="/"/>
        </Router>
      );
    } else {
      component = (
        <Router history={history}>
      	  <Route path="/login" component={Login}/>
          <Redirect from="*" to="/login"/>
        </Router>
      );
    }
    return component;
  }
}
