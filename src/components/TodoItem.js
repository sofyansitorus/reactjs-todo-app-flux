import React, { Component } from 'react';
import Button from './Button';
import InputCheckbox from './InputCheckbox';
import TodoActions from '../flux/TodoActions';

class TodoItem extends Component {

  handleToggle(todoId) {
    TodoActions.toggleItem(todoId);
  }

  handleDelete(todoId) {
    TodoActions.deleteItem(todoId);
  }

  render() {
    const { onClick, onChange, completed, title, canDelete, canUpdate, ...itemProps } = this.props;

    const CompleteItem = () => {
      const completeProps = {
        ...itemProps,
        checked: completed,
        onChange: canUpdate ? () => this.handleToggle(this.props.id) : () => alert(`You are not allowed to update this item`),

      };
      return <InputCheckbox {...completeProps} />;
    };

    const DeleteItem = () => {
      const deleteProps = {
        ...itemProps,
        onClick: canDelete ? () => this.handleDelete(this.props.id) : () => alert(`You are not allowed to delete this item`),
      };
      return <Button {...deleteProps}>Delete</Button>;
    };

    const itemStyle = {
      textDecoration: completed ? 'line-through' : 'none'
    };

    return (
      <li style={itemStyle}>
        <CompleteItem />
        <span className="todo-item-text">{title}</span>
        <DeleteItem />
      </li>
    );
  }
}

export default TodoItem;
