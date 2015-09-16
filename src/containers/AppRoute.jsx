import React, { Component, PropTypes } from 'react';
import Router, { Route, Redirect } from 'react-router';
import { createHistory } from 'history';
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
        <Router history={createHistory()}>
      	  <Route path="/main" component={TodoApp}/>
          <Route path="/login" component={Login}/>
      	  <Redirect from="*" to="/main"/>
        </Router>
      );
    } else {
      component = (
        <Router history={createHistory()}>
      	  <Route path="/login" component={Login}/>
          <Redirect from="*" to="/login"/>
        </Router>
      );
    }
    return component;
  }
}
