import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import AppRouter from './AppRouter.jsx';
import Loader from './Loader.jsx';
import Login from './Login.jsx';

class TodoApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isReady: false,
      isLoggedIn: false
    };
  }
  handleDone(isLoggedIn) {
    this.setState({
      isReady: true,
      isLoggedIn: isLoggedIn
    });
  }
  render() {
    return (
      <div>
        <div style={this.state.isReady ? {display: 'none'} : {} }>
          <Loader onDone={::this.handleDone}/>
        </div>
        {this.state.isLoggedIn && <Login/>}
        <div style={!this.state.isReady ? {display: 'none'} : {} }>
          <AppRouter {...this.props}/>
        </div>
      </div>
      );
  }
}

function mapState(state) {
  return {
    todos: state.todos
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(TodoApp);
