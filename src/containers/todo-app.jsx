import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from 'src/actions/todo-actions.js';
import * as CredentialsActions from 'src/actions/credentials-actions.js';
import auth from 'src/core/auth.js';
import Header from 'src/components/header.jsx';
import MainSection from 'src/components/main-section.jsx';
import todoStyle from 'src/style/todo-style.scss';

export class TodoAppComponent extends Component {
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
            <MainSection todos={todos} actions={todoActions} />
          </div>
        </section>
      </div>
    );
  }
}

if (__DEV__) {
  // Not needed or used in minified mode
  TodoAppComponent.propTypes = {
    todos: PropTypes.array.isRequired,
    credentialsActions: PropTypes.object.isRequired,
    todoActions: PropTypes.object.isRequired
  };
}

const TodoApp = connect(state => ({ todos: state.todos }), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch),
  todoActions: bindActionCreators(TodoActions, dispatch)
}))(TodoAppComponent);

export default TodoApp;
