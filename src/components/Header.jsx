import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput.jsx';
import todoStyle from '../style/todo-style.scss';

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className={todoStyle.header}>
          <h1>Todos</h1>
          <TodoTextInput
            newTodo={true}
            onSave={::this.handleSave}
            placeholder="What needs to be done?"
          />
      </header>
    );
  }
}
