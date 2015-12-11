import React, { Component, PropTypes } from 'react';
import Router, { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import TodoApp from './TodoApp.jsx';

import * as CredentialsActions from '../actions/CredentialsActions';

import history from '../core/history';
import auth from '../core/auth';

let isCheckingInitialLogIn = true;
let shouldRouterUpdate = true;
class AppRoute extends Component {
  static propTypes = {
    stores: PropTypes.object,
    actions: PropTypes.object
  };
  constructor(...args) {
    super(...args);

    const { credentialsActions } = this.props.actions;
    credentialsActions.checkCredentials();

    const handleLoggedIn = () => {
      isCheckingInitialLogIn = false;
      if (auth.getAuthenticated()) {
        credentialsActions.checkCredentialsSucess();
      } else {
        setTimeout(() => {
          credentialsActions.checkCredentialsFailure();
        });
      }
    };

    // If isAsync is true, that means callback will be called when
    // finishes checking if logged in, else run the callback ourselfs
    const isAsync = auth.loggedIn(handleLoggedIn);
    if (!isAsync) { handleLoggedIn(); }
  }
  shouldComponentUpdate() {
    return shouldRouterUpdate;
  }
  componentDidUpdate() {
    // After done checking and flushed to dom (componentDidUpdate occurs), do not update again
    if (!isCheckingInitialLogIn) {
      shouldRouterUpdate = false;
    }
  }
  checkAuth(nextState, replaceState) {
    if (!auth.getAuthenticated()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  }
  handleRedirect(nextState, replaceState) {
    replaceState({ nextPathname: nextState.location.pathname }, auth.getAuthenticated() ? '/main' : '/login');
  }

  render() {
    if (isCheckingInitialLogIn) {
      return (<Login/>);
    }

    return (
      <Router history={history}>
        <Route path="/main" component={TodoApp} onEnter={::this.checkAuth}/>
        <Route path="/login" component={Login}/>
        <Route path="*" onEnter={::this.handleRedirect}/>
      </Router>
    );
  }
}
export default connect(state => ({stores: state}), dispatch => ({ actions: {
  credentialsActions: bindActionCreators(CredentialsActions, dispatch)
}}))(AppRoute);
