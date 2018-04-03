import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import InputText from './InputText';
import Button from './Button';
import Counter from '../helpers/Counter';

export default class App extends Component {
  constructor(props) {
    super(props);

    const todoList = [{
      id: Counter.increment(),
      title: 'Exercise',
      completed: Math.random() >= 0.5,
      canUpdate: Math.random() >= 0.5,
      canDelete: Math.random() >= 0.5,
    }, {
      id: Counter.increment(),
      title: 'Breakfast',
      completed: Math.random() >= 0.5,
      canUpdate: Math.random() >= 0.5,
      canDelete: Math.random() >= 0.5,
    }, {
      id: Counter.increment(),
      title: 'Take a shower',
      completed: Math.random() >= 0.5,
      canUpdate: Math.random() >= 0.5,
      canDelete: Math.random() >= 0.5,
    }];

    this.state = {
      todoList,
      todoInput: '',
      todoFilter: 'all',
    };
  }

  handleToggle(todoId) {
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
    const todoList = this.state.todoList.filter((todo, index, self) => {
      return todo.id !== todoId;
    });

    this.setState({
      todoList,
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

    const todoList = [
      ...this.state.todoList,
      ...todoInput.map(title => {
        return {
          id: Counter.increment(),
          title: title,
          completed: false,
          canUpdate: Math.random() >= 0.5,
          canDelete: Math.random() >= 0.5
        };
      })
    ];

    this.setState({
      todoList,
      todoInput: '',
      todoFilter: 'all',
    });
  };

  handleInputChange(e) {
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
          <InputText value={this.state.todoInput} onChange={e => this.handleInputChange(e)} />
          <Button type="submit" label="Add todo!" />
        </form>
        <h3>Showing {this.state.todoFilter} todo items</h3>
        <TodoList todoList={todoListFiltered(this.state.todoFilter)} onChange={i => this.handleToggle(i)} onClick={i => this.handleDelete(i)} />
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
