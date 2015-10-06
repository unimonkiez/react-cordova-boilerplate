import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CredentialsActions from '../actions/CredentialsActions';
import customFont from '../style/custom-font.scss';
import auth from '../core/auth';

export class Login extends Component {
  static propTypes = {
    general: PropTypes.object,
    credentials: PropTypes.object,
    credentialsActions: PropTypes.object
  };
  handleSubmit(e) {
    e.preventDefault();

    const { credentialsActions } = this.props;
    credentialsActions.addCredentials();

    const email = this.refs.email.getDOMNode().value;
    const password = this.refs.password.getDOMNode().value;

    auth.login(email, password, (authenticated, hint) => {
      if (authenticated) {
        credentialsActions.addCredentialsSucess();
      } else {
        credentialsActions.addCredentialsFailure(hint);
      }
    });
  }
  render() {
    const { general, credentials } = this.props;
    const { mounted } = general;
    const { checkingToken, loggingIn, hint } = credentials;
    const hideLogin = (!mounted) || checkingToken || loggingIn;

    return (
      <div style={{position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', textAlign: 'center', backgroundColor: '#F7DF1E', color: 'black'}}>
        <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
          <div>
            <span className={`${customFont.customFont} ${customFont.customFontJs}`} style={{fontSize: '200px'}}>
              <span className={customFont.path1}></span>
              <span className={customFont.path2}></span>
            </span>
            <h1>TodoMVC example</h1>
          </div>
          <div style={{maxHeight: hideLogin ? '0' : '149px', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out'}}>
            <h1>Login</h1>
            <form onSubmit={::this.handleSubmit}>
              <div style={{paddingTop: '5px'}}>
                <input type="text" ref="email" placeholder="Email"/>
              </div>
              <div style={{paddingTop: '5px'}}>
                <input type="password" ref="password" placeholder="Password"/>
                <div style={{height: '1em'}}>{hint && `Hint: ${hint}`}</div>
              </div>
              <div style={{paddingTop: '5px'}}>
                <input type="submit" value="Login"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ general: state.general, credentials: state.credentials }), dispatch => ({ credentialsActions: bindActionCreators(CredentialsActions, dispatch) }))(Login);
