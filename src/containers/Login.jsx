import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  static propTypes = {
    credentials: PropTypes.object,
    credentialsActions: PropTypes.object,
    prevPath: PropTypes.string,
    onLogin: PropTypes.func
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      hideLogin: props.prevPath === undefined
    };
  }
  componentDidMount() {
    this.getLoginState().then((data) => {
      this.props.onLogin(data);
    }, () => {
      this.setState({
        hideLogin: false
      });
    });
  }
  getLoginState() {
    // Resolve if login is valid, reject if needs to log in.
    const promise = new Promise((resolve, reject) => {
      setTimeout(reject);
    });
    return promise;
  }
  handleSubmit(e) {
    e.preventDefault();
    // Ajax..
    setTimeout(() => {
      const randToken = Math.random().toString(36).substr(2);
      this.props.credentialsActions.addCredentials(randToken);
    }, 1000);
  }
  render() {
    const { hideLogin } = this.state;
    return (
      <div style={{position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', textAlign: 'center', backgroundColor: '#F7DF1E'}}>
        <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
          <div>
            <span className="icon-js" style={{fontSize: '200px', border: '1px solid black'}}>
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
            <h1>TodoMVC example</h1>
          </div>
          <div style={{maxHeight: hideLogin ? '0' : '500px', overflow: 'hidden', transition: 'max-height 1.5s ease-in-out'}}>
            <h1>Login</h1>
            <form onSubmit={::this.handleSubmit}>
              <div>
                <input type="text" placeholder="Email"/>
              </div>
              <div>
                <input type="password" placeholder="Password"/>
              </div>
              <div>
                <input type="submit" value="Login"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
