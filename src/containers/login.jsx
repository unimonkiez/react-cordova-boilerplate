import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import customFont from 'src/style/custom-font.scss';
import auth from 'src/common/auth.js';
import * as CredentialsActions from 'src/actions/credentials-actions.js';

class LoginComponent extends Component {
  static defaultProps = {
    route: undefined
  };
  componentWillMount() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isMountedAndCreatedByRouter: false
    };
  }
  componentDidMount() {
    // Change 'isMountedAndCreatedByRouter' from false to true
    // only when generated from router for the first time.
    // For animation effect
    if (this.props.route !== undefined) {
      setTimeout(() => this.setState({ isMountedAndCreatedByRouter: true }));
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    const { credentialsActions } = this.props;
    credentialsActions.addCredentials();

    const email = this._emailRef.value;
    const password = this._passwordRef.value;

    auth.login(email, password, (authenticated, hint) => {
      if (authenticated) {
        credentialsActions.addCredentialsSucess();
      } else {
        credentialsActions.addCredentialsFailure(hint);
      }
    });
  }
  render() {
    const { credentials } = this.props;
    const { isMountedAndCreatedByRouter } = this.state;
    const { checkingToken, loggingIn, hint } = credentials;
    const hideLogin = (!isMountedAndCreatedByRouter) || checkingToken || loggingIn;

    return (
      <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', textAlign: 'center', backgroundColor: '#F7DF1E', color: 'black' }}>
        <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <div>
            <span className={`${customFont.customFont} ${customFont.customFontJs}`} style={{ fontSize: '200px' }}>
              <span className={customFont.path1} />
              <span className={customFont.path2} />
            </span>
            <h1>
              TodoMVC example
            </h1>
          </div>
          <div style={{ maxHeight: hideLogin ? '0' : '195px', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out' }}>
            <h1 style={{ margin: '0', padding: '20px 0' }}>
              Login
            </h1>
            <form onSubmit={this.handleSubmit} style={{ width: '200px', margin: 'auto' }}>
              <div style={{ paddingTop: '5px' }}>
                <input type="text" ref={ref => { this._emailRef = ref; }} placeholder="Email" style={{ width: '100%', height: '25px' }} />
              </div>
              <div style={{ paddingTop: '5px' }}>
                <input type="password" ref={ref => { this._passwordRef = ref; }} placeholder="Password" style={{ width: '100%', height: '25px' }} />
                <div style={{ height: '1em', color: '#383838', fontWeight: 400 }}>{hint && `Hint: ${hint}`}</div>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <button type="submit" style={{ width: '100%', height: '25px' }}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

if (__DEV__) {
  // Not needed or used in minified mode
  LoginComponent.PropTypes = {
    credentials: PropTypes.shape({
      authenticated: PropTypes.bool,
      checkingToken: PropTypes.bool,
      loggingIn: PropTypes.bool,
      hint: PropTypes.bool
    }),
    credentialsActions: PropTypes.shape({
      clearCredentials: PropTypes.func.isRequired,
      checkCredentials: PropTypes.func.isRequired,
      checkCredentialsSucess: PropTypes.func.isRequired,
      checkCredentialsFailure: PropTypes.func.isRequired,
      addCredentials: PropTypes.func.isRequired,
      addCredentialsSucess: PropTypes.func.isRequired,
      addCredentialsFailure: PropTypes.func.isRequired
    })
  };
  LoginComponent.propTypes = {
    route: PropTypes.shape({}),
    credentials: LoginComponent.PropTypes.credentials.isRequired,
    credentialsActions: LoginComponent.PropTypes.credentialsActions.isRequired
  };
}

const Login = connect(state => ({ credentials: state.credentials }), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch)
}))(LoginComponent);

export default Login;
