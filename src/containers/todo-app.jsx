import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from 'src/actions/todo-actions.js';
import * as CredentialsActions from 'src/actions/credentials-actions.js';
import auth from 'src/common/auth.js';
import Header from 'src/components/header.jsx';
import MainSection from 'src/components/main-section.jsx';
import todoStyle from 'src/style/todo-style.scss';
import TodoItem from 'src/components/todo-item.jsx';

class TodoAppComponent extends Component {
  handleLogout = this.handleLogout.bind(this);
  handleLogout() {
    auth.logout();
    this.props.credentialsActions.clearCredentials();
  }
  render() {
    const { todos, todoActions } = this.props;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ marginTop: '5px' }} onClick={this.handleLogout}>Logout</button>
        </div>
        <section className={todoStyle.todoapp}>
          <div>
            <Header {...todoActions} />
            <MainSection todos={todos} {...todoActions} />
          </div>
        </section>
      </div>
    );
  }
}

if (__DEV__) {
  // Not needed or used in minified mode
  TodoAppComponent.propTypes = {
    todos: PropTypes.arrayOf(TodoItem.propTypes.todo).isRequired,
    credentialsActions: PropTypes.shape({
      clearCredentials: PropTypes.func.isRequired,
      checkCredentials: PropTypes.func.isRequired,
      checkCredentialsSucess: PropTypes.func.isRequired,
      checkCredentialsFailure: PropTypes.func.isRequired,
      addCredentials: PropTypes.func.isRequired,
      addCredentialsSucess: PropTypes.func.isRequired,
      addCredentialsFailure: PropTypes.func.isRequired
    }).isRequired,
    todoActions: PropTypes.shape({
      addTodo: PropTypes.func.isRequired,
      deleteTodo: PropTypes.func.isRequired,
      editTodo: PropTypes.func.isRequired,
      markTodo: PropTypes.func.isRequired,
      markAll: PropTypes.func.isRequired,
      clearMarked: PropTypes.func.isRequired
    }).isRequired
  };
}

const TodoApp = connect(state => ({ todos: state.todos }), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch),
  todoActions: bindActionCreators(TodoActions, dispatch)
}))(TodoAppComponent);

export default TodoApp;
