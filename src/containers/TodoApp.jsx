import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import Header from '../components/Header.jsx';
import MainSection from '../components/MainSection.jsx';

class TodoApp extends Component {
  render() {
    const {todos, actions} = this.props;
    return (
      <div>
        <Header {...actions}/>
        <MainSection todos={todos} actions={actions}/>
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
