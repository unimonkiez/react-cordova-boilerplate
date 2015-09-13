import React, { PropTypes, Component } from 'react';

export default class Logo extends Component {
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
        }, 500);
      }, 300);
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
      <div style={{position: 'absolute', zIndex: '100', width: '100%', height: '100%'}}>
        <h1>Epic logo</h1>
        { text }
      </div>
    );
  }
}
