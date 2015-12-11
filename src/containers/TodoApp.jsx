import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import * as CredentialsActions from '../actions/CredentialsActions';
import auth from '../core/auth';
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
    credentialsActions: PropTypes.object.isRequired,
    todoActions: PropTypes.object.isRequired
  };
  handleLogout() {
    auth.logout();
    this.props.credentialsActions.clearCredentials();
  }
  render() {
    const { todos, todoActions } = this.props;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ marginTop: '5px' }} onClick={::this.handleLogout}>Logout</button>
        </div>
        <div style={style}>
          <Header {...todoActions}/>
          <MainSection todos={todos} actions={todoActions}/>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch),
  todoActions: bindActionCreators(TodoActions, dispatch)
}))(TodoApp);
