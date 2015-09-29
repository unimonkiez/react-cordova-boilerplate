import React, { PropTypes, Component } from 'react';
import customFont from '../global-style/custom-font.scss';

export default class Loader extends Component {
  static propTypes = {
    onDone: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: false,
      auth: false
    };
  }
  componentDidMount() {
    if (!this.state.loaded) {
      setTimeout(() => {
        this.setState({
          loaded: true
        });
        setTimeout(() => {
          this.setState({
            auth: true
          });
        }, 700);
      }, 500);
    }
  }
  render() {
    let text;
    if (this.state.auth) {
      text = 'Done!';
    } else if (this.state.loaded) {
      text = 'Authicating...';
    } else {
      text = 'Loading...';
    }
    return (
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        zIndex: '100',
        width: '100%',
        height: '100%',
        paddingTop: '200px',
        textAlign: 'center',
        backgroundColor: '#222222',
        color: 'white'
      }}>
        <span className={`${customFont.customFont} ${customFont.customFontJs}`} style={{fontSize: '200px'}}>
          <span className={customFont.path1}></span>
          <span className={customFont.path2}></span>
        </span>
        <h1>TodoMvc</h1>
        { text }
      </div>
    );
  }
}
