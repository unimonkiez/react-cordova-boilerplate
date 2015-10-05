import React, { Component, PropTypes } from 'react';
import Router, { Route } from 'react-router';
import { createHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import TodoApp from './TodoApp.jsx';

import * as TodoActions from '../actions/TodoActions';

import auth from '../core/auth';

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
  todoActions: bindActionCreators(TodoActions, dispatch)
}}))
export default class AppRoute extends Component {
  static propTypes = {
    stores: PropTypes.object,
    actions: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    const history = createHistory();
    this.state = {
      history,
      isFirstPath: true,
      authenticated: false
    };
  }
  componentDidMount() {
    auth.loggedIn(::this.handleAuthChange);
  }
  componentWillMount() {
    this._unregisterOnChangeHandler = auth.registerOnChangeHandler(::this.handleAuthChange);
  }
  componentWillUnmount() {
    this._unregisterOnChangeHandler();
    delete this._unregisterOnChangeHandler;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.authenticated !== prevState.authenticated) {
      this.state.history.pushState(null, '/');
    }
  }
  handleAuthChange(authenticated) {
    this.setState({
      authenticated
    });
  }
  checkAuth(nextState, replaceState) {
    if (!this.state.authenticated) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  }
  handleRedirect(nextState, replaceState) {
    replaceState({ nextPathname: nextState.location.pathname }, this.state.authenticated ? '/main' : '/login');
  }

  render() {
    const { history, isFirstPath, authenticated } = this.state;

    const {stores, actions} = this.props;
    const { todos } = stores;
    const { todoActions } = actions;

    return (
      <Router history={history}>
        <Route path="/main" component={wrapComponent(TodoApp, { todos, actions: todoActions })} onEnter={::this.checkAuth}/>
        <Route path="/login" component={wrapComponent(Login, { history, hideLogin: authenticated })}/>
        <Route path="*" onEnter={::this.handleRedirect}/>
      </Router>
    );
  }
}
