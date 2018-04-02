import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import InputText from './InputText';
import Button from './Button';

export default class App extends Component {
  constructor(props) {
    super(props);

    const todoList = [{
      id: 1,
      title: 'Exercise (Update not allowed)',
      completed: false,
      canUpdate: false,
    }, {
      id: 2,
      title: 'Breakfast',
      completed: true
    }, {
      id: 3,
      title: 'Take a shower (Delete not allowed)',
      completed: false,
      canDelete: false,
    }];

    const todoLastId = todoList.length ? todoList[todoList.length - 1].id : 0;

    this.state = {
      todoLastId,
      todoList,
      todoInput: '',
      todoFilter: 'all',
    };
  }

  handleComplete(todoId) {
    const todoList = this.state.todoList.map(todo => {
      if (todoId !== todo.id) {
        return todo;
      }
      todo.completed = !todo.completed;
      return todo;
    });

    this.setState({
      todoList: [...todoList],
    });
  };

  handleDelete(todoId) {
    let todoLastId = 0;

    const todoList = this.state.todoList.filter((todo, index, self) => {
      return todo.id !== todoId;
    }).map(todo => {
      todo.id = ++todoLastId; // Re-assign todo.id to avoid jumping id sequence.
      return todo;
    });

    this.setState({
      todoLastId,
      todoList: [...todoList],
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.todoInput.length) {
      alert('Input is empty');
      return;
    }

    const todoInput = this.filterTodoInput();
    if (!todoInput.length) {
      alert('Input is duplicate');
      return;
    }

    let todoLastId = this.state.todoLastId;
    const todoList = [
      ...this.state.todoList,
      ...todoInput.map(title => {
        return { id: ++todoLastId, title: title, completed: false };
      })
    ];

    this.setState({
      todoLastId,
      todoList,
      todoInput: '',
      todoFilter: 'all',
    });
  };

  handleChange(e) {
    this.setState({ todoInput: e.target.value });
  }

  handleFilter(todoFilter) {
    this.setState({
      todoFilter,
    });
  }

  render() {

    const todoList = {};

    const todoListFilters = [{
      list: 'all',
      label: 'Show All',
    }, {
      list: 'completed',
      label: 'Show Completed',
    }, {
      list: 'uncompleted',
      label: 'Show Uncompleted',
    }];

    todoListFilters.forEach(filter => {
      todoList[filter.list] = [];
    });

    this.state.todoList.forEach(todo => {
      if (todo.completed) {
        todoList.completed.push(todo);
      }
      if (!todo.completed) {
        todoList.uncompleted.push(todo);
      }
      todoList.all.push(todo);
    });

    const todoListFiltered = (list) => {
      return todoList[list] || todoList.all;
    };

    const FilterTodoListButtons = () => todoListFilters.map(filter => {
      const props = {
        ...filter, ...{
          key: filter.list,
          label: `${filter.label} (${todoListFiltered(filter.list).length})`,
          onClick: () => this.handleFilter(filter.list)
        }
      };
      return <Button {...props} />;
    });

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <p>Separate with comma for multiple todo items. Press "ENTER" key or click "Add todo!" button to submit.</p>
          <InputText value={this.state.todoInput} onChange={e => this.handleChange(e)} />
          <Button type="submit" label="Add todo!" />
        </form>
        <h3>Showing {this.state.todoFilter} todo items</h3>
        <TodoList todoList={todoListFiltered(this.state.todoFilter)} onChange={i => this.handleComplete(i)} onClick={i => this.handleDelete(i)} />
        <FilterTodoListButtons />
      </div>
    );
  }

  filterTodoInput() {
    return this.state.todoInput.split(',')
      .map(todo => todo.trim()) // Trim white space for todo input
      .filter((todo, index, self) => {
        return todo.length > 0 // Remove empty string
          && self.map(todoSelf => todoSelf.toLowerCase()).indexOf(todo.toLowerCase()) === index // Remove duplicate against new todoList
          && !this.state.todoList.find(todoExisting => todoExisting.title.toLowerCase() === todo.toLowerCase()); // Remove duplicate against existing todoList
      });
  }
}
