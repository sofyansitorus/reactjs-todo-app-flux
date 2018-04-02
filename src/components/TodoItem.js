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
        onChange: () => onChange(this.props.id),

      };
      if (!canUpdate && canUpdate !== undefined) {
        completeProps.onChange = () => alert(`You are not allowed to update this item`);
      }
      return <InputCheckbox {...completeProps} />;
    };

    const DeleteItem = () => {
      const deleteProps = {
        ...itemProps,
        onClick: () => onClick(this.props.id),
      };
      if (!canDelete && canDelete !== undefined) {
        deleteProps.onClick = () => alert(`You are not allowed to delete this item`);
      }
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
