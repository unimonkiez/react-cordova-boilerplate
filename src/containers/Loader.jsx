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
    }
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
                }, this.state.onDone);
            }, 500);
        }, 300);
    }   
  }

  componentDidUpdate() {
    if (this.state.auth){
      this.props.onDone();
    }
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <div style={{position: 'absolute', zIndex: '100', width: '100%', height: '100%'}}>
        <h1>Epic logo</h1>
        { this.state.loaded ? (this.state.auth ? 'Done!' : 'Authicating...') : 'Loading...' }
      </div>
    );
  }
}
