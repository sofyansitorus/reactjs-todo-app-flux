import React, { Component } from 'react';
import Button from './Button';
import InputCheckbox from './InputCheckbox';

class TodoItem extends Component {
  render() {
    const { onClick, onChange, completed, title, canDelete, canUpdate, ...itemProps } = this.props;

    const CompleteItem = () => {
      const completeProps = {
        ...itemProps,
        checked: completed,
        onChange: canUpdate ? () => onChange(this.props.id) : () => alert(`You are not allowed to update this item`),

      };
      return <InputCheckbox {...completeProps} />;
    };

    const DeleteItem = () => {
      const deleteProps = {
        ...itemProps,
        onClick: canDelete ? () => onClick(this.props.id) : () => alert(`You are not allowed to delete this item`),
      };
      return <Button {...deleteProps}>Delete</Button>;
    };

    return (
      <li className={`todo-item ${completed ? 'completed' : ''}`}>
        <CompleteItem />
        <span className="todo-item-text">{title}</span>
        <DeleteItem />
      </li>
    );
  }
}

export default TodoItem;
