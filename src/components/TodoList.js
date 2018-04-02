import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todoList, ...listProps } = this.props;
    return (
      <ul>
        {todoList.map(todo => <TodoItem key={todo.id} {...listProps} {...todo} />)}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todoList: PropTypes.array,
};

export default TodoList;
