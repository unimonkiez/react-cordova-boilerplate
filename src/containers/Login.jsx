import React, { Component, PropTypes } from 'react';
import customFont from '../style/custom-font.scss';
import auth from '../core/auth';

export default class Login extends Component {
  static propTypes = {
    credentials: PropTypes.object,
    credentialsActions: PropTypes.object,
    history: PropTypes.object,
    hideLogin: PropTypes.bool
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      hint: false,
      hideLogin: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hideLogin: this.props.hideLogin
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.getDOMNode().value;
    const password = this.refs.password.getDOMNode().value;
    auth.login(email, password, (authenticated, hint) => {
      if (authenticated) {
        this.props.history.pushState('/');
      } else {
        this.setState({
          hint
        });
      }
    });
  }
  render() {
    const { hint, hideLogin } = this.state;
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
          <div style={{maxHeight: hideLogin ? '0' : '500px', overflow: 'hidden', transition: 'max-height 1.5s ease-in-out'}}>
            <h1>Login</h1>
            <form onSubmit={::this.handleSubmit}>
              <div style={{paddingTop: '5px'}}>
                <input type="text" ref="email" placeholder="Email"/>
              </div>
              <div style={{paddingTop: '5px'}}>
                <input type="password" ref="password" placeholder="Password"/>
                {hint && <div>Hint: {hint}</div>}
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
