import React, { PropTypes, Component } from 'react';
import logoImgUrl from '../assets/logo.png';

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
          }, this.props.onDone.bind(this, true));
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
        <img src={logoImgUrl}/>
        <h1>TodoMvc</h1>
        { text }
      </div>
    );
  }
}
