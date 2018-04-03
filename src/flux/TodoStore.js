import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';

const CHANGE = 'CHANGE';
let _todoState = [];

class TodoStore extends EventEmitter {

  constructor() {
    super();

    // Registers action handler with the Dispatcher.
    Dispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    switch (action.actionType) {
      case ActionTypes.ADD_NEW_ITEM:
        this._addNewItem(action.payload);
        break;
      case ActionTypes.DELETE_ITEM:
        this._deleteItem(action.payload);
        break;
      case ActionTypes.TOGGLE_ITEM:
        this._toggleItem(action.payload);
        break;
    }
  }

  // Adds a new item to the list and emits a CHANGED event.
  _addNewItem(item) {
    _todoState.push(item);
    this.emit(CHANGE);
  }

  _deleteItem(todoId) {
    _todoState = _todoState.slice().filter((item) => {
      return item.id !== todoId;
    });
    this.emit(CHANGE);
  }

  _toggleItem(todoId) {
    _todoState = _todoState.slice().map(todo => {
      if (todoId !== todo.id) {
        return todo;
      }
      todo.completed = !todo.completed;
      return todo;
    });
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getAllItems() {
    return _todoState;
  }

  // Hooks a React component's callback to the CHANGE event.
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default new TodoStore();
