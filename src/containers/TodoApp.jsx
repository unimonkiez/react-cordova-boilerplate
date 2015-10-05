import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import Header from '../components/Header.jsx';
import MainSection from '../components/MainSection.jsx';

const style = {
  marginTop: '15%',
  border: '10px solid transparent',
  boxShadow: '2px 2px 10px 0px',
  borderRadius: '10px'
};

export class TodoApp extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };
  render() {
    const { todos, actions } = this.props;
    return (
      <div style={style}>
        <Header {...actions}/>
        <MainSection todos={todos} actions={actions}/>
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }), dispatch => ({ actions: bindActionCreators(TodoActions, dispatch) }))(TodoApp);
