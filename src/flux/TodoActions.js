import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';

class TodoActions {

  addNewItem(item) {
    // Note: This is usually a good place to do API calls.
    Dispatcher.dispatch({
      actionType: ActionTypes.ADD_NEW_ITEM,
      payload: item
    });
  }

  deleteItem(todoId) {
    // Note: This is usually a good place to do API calls.
    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_ITEM,
      payload: todoId
    });
  }

  toggleItem(todoId) {
    // Note: This is usually a good place to do API calls.
    Dispatcher.dispatch({
      actionType: ActionTypes.TOGGLE_ITEM,
      payload: todoId
    });
  }

}

export default new TodoActions();
