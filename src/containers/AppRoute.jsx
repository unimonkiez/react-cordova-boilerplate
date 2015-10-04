import React, { Component, PropTypes } from 'react';
import Router, { Route, Redirect } from 'react-router';
import { createHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import TodoApp from './TodoApp.jsx';

import * as TodoActions from '../actions/TodoActions';
import * as CredentialsActions from '../actions/CredentialsActions';

const wrapComponent = (component, props) => React.createClass({
  propTypes: {
    route: PropTypes.object
  },
  render() {
    const { route } = this.props;
    return React.createElement(component, { route, ...props});
  }
});

@connect(state => ({stores: state}), dispatch => ({ actions: {
  todoActions: bindActionCreators(TodoActions, dispatch),
  credentialsActions: bindActionCreators(CredentialsActions, dispatch)
}}))
export default class AppRoute extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    stores: PropTypes.object,
    actions: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.history = createHistory();
  }

  defaultProps() {
    return {
      isLoggedIn: false
    };
  }
  render() {
    let component;
    const {stores, actions} = this.props;
    const { credentials, todos } = stores;
    const { credentialsActions, todoActions } = actions;

    if (this.props.isLoggedIn) {
      component = (
        <Router history={this.history}>
          <Route path="/main" component={wrapComponent(TodoApp, { todos, actions: todoActions })}/>
          <Redirect from="*" to="/main"/>
        </Router>
      );
    } else {
      component = (
        <Router history={this.history}>
          <Route path="/login" component={wrapComponent(Login, { credentials, credentialsActions, onLogin: this.handleLogin })}/>
          <Redirect from="*" to="/login"/>
        </Router>
      );
    }
    return component;
  }
}
