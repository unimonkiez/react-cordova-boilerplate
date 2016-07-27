import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import TodoApp from './TodoApp.jsx';
import auth from '../core/auth';
import * as CredentialsActions from '../actions/CredentialsActions';

class AppRoute extends Component {
  static propTypes = {
    stores: PropTypes.object,
    actions: PropTypes.object
  };
  constructor(...args) {
    super(...args);

    this._authenticated = this.props.stores.credentials.authenticated;
    this._isCheckingInitialLogIn = true;
    this._shouldRouterUpdate = true;

    const { credentialsActions } = this.props.actions;
    credentialsActions.checkCredentials();

    const handleLoggedIn = (authenticated) => {
      this._isCheckingInitialLogIn = false;
      if (authenticated) {
        credentialsActions.checkCredentialsSucess();
      } else {
        setTimeout(() => {
          credentialsActions.checkCredentialsFailure();
        });
      }
    };

    // If authenticated has value, that means we got answer if the user is logged in.
    // If authenticated is undefined that means callback will be called when finishes checking if logged in
    const authenticated = auth.loggedIn(handleLoggedIn);
    if (authenticated !== undefined) { handleLoggedIn(authenticated); }
  }
  componentDidMount() {
    this.checkIfToStopAppRouterRenders();
  }
  shouldComponentUpdate(nextProps) {
    // Each time props are about to update - switch url if needed
    this._authenticated = nextProps.stores.credentials.authenticated;
    if (this.props.stores.credentials.authenticated !== this._authenticated) {
      hashHistory.push('/');
    }
    return this._shouldRouterUpdate;
  }
  componentDidUpdate() {
    this.checkIfToStopAppRouterRenders();
  }
  checkIfToStopAppRouterRenders() {
    // After done checking and flushed to dom , do not update again
    if (!this._isCheckingInitialLogIn) {
      this._shouldRouterUpdate = false;
    }
  }
  checkAuth(nextState, replace) {
    if (!this._authenticated) {
      replace('/login');
    }
  }
  handleRedirect(nextState, replace) {
    replace(this._authenticated ? '/main' : '/login');
  }

  render() {
    if (this._isCheckingInitialLogIn) {
      return (<Login />);
    }

    return (
      <Router history={hashHistory}>
        <Route path="/main" component={TodoApp} onEnter={::this.checkAuth} />
        <Route path="/login" component={Login} />
        <Route path="*" onEnter={::this.handleRedirect} />
      </Router>
    );
  }
}
export default connect(state => ({ stores: state }), dispatch => ({
  actions: {
    credentialsActions: bindActionCreators(CredentialsActions, dispatch)
  }
}))(AppRoute);
