import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import InputText from './InputText';
import Button from './Button';
import Counter from '../helpers/Counter';
import TodoActions from '../flux/TodoActions';
import TodoStore from '../flux/TodoStore';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: TodoStore.getAllItems(),
      todoInput: '',
      todoFilter: 'all',
    };

    this._onChange = this._onChange.bind(this);

    this._enableRandomBoolen = false; // Set this to 'true' to enable random boolean for canUpdate and canDelete item value.
  }

  _onChange() {
    this.setState({ todoList: TodoStore.getAllItems() });
  }

  componentWillMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  handleToggle(todoId) {
    TodoActions.toggleItem(todoId);
  };

  handleDelete(todoId) {
    TodoActions.deleteItem(todoId);
  };

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.todoInput.length) {
      alert('Input is empty');
      return;
    }

    const todoInput = this._filterTodoInput();
    if (!todoInput.length) {
      alert('Input is duplicate');
      return;
    }

    todoInput.forEach(title => {
      const newItem = {
        id: Counter.increment(),
        title: title,
        completed: false,
        canUpdate: this._randomBoolean(),
        canDelete: this._randomBoolean()
      }
      TodoActions.addNewItem(newItem);
    });

    this.setState({
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
        <h3>Showing {this.state.todoFilter} todo items</h3>
        <FilterTodoListButtons />
        <TodoList todoList={todoListFiltered(this.state.todoFilter)} onChange={i => this.handleToggle(i)} onClick={i => this.handleDelete(i)} />
        <form onSubmit={e => this.handleSubmit(e)}>
          <p>Separate with comma for multiple todo items.<br />
          <InputText value={this.state.todoInput} onChange={e => this.handleInputChange(e)} />
          </p>
          <p>
            <Button type="submit" label="Add todo!" /><br />Press "ENTER" key or click "Add todo!" button to submit.
          </p>
        </form>
      </div>
    );
  }

  _filterTodoInput() {
    return this.state.todoInput.split(',')
      .map(todo => todo.trim()) // Trim white space for todo input
      .filter((todo, index, self) => {
        return todo.length > 0 // Remove empty string
          && self.map(todoSelf => todoSelf.toLowerCase()).indexOf(todo.toLowerCase()) === index // Remove duplicate against new todoList
          && !this.state.todoList.find(todoExisting => todoExisting.title.toLowerCase() === todo.toLowerCase()); // Remove duplicate against existing todoList
      });
  }

  _randomBoolean() {
    return this._enableRandomBoolen ? (Math.random() >= 0.5) : true;
  }
}
