import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import {
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  fetchTodosSuccess,
  updateTodoSuccess,
  clearCompletedTodosSuccess, 
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
  clearCompletedTodosRequest, 
  todoOperationFailed,
} from './todosSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';


function* handleAddTodo(action) {
  try {
    const localId = uuidv4();

    yield call(fetch, API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: action.payload,
        completed: false,
      }),
    });

    yield put(addTodoSuccess({
      id: localId,
      text: action.payload,
      completed: false,
      isLocal: true, 
    }));
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleFetchTodos() {
  try {
    const response = yield call(fetch, `${API_URL}?_limit=10`); 
    const data = yield response.json();
    yield put(fetchTodosSuccess(data.map(todo => ({ id: todo.id, text: todo.title, completed: todo.completed }))));
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleToggleTodo(action) {
  const { id } = action.payload;
  const state = yield select(); 
  const todo = state.todos.items.find(t => t.id === id);
  if (!todo) return;
  yield put(toggleTodoSuccess({ id, completed: !todo.completed }));
}

function* handleDeleteTodo(action) {
  try {
    yield call(fetch, `${API_URL}/${action.payload}`, {
      method: 'DELETE',
    });
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleUpdateTodo(action) {
  const { id, text } = action.payload;

  const isLocal = typeof id === 'string' && id.length > 10; 

  try {
    if (isLocal) {
      yield put(updateTodoSuccess({ id, text }));
    } else {
      const response = yield call(fetch, `${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: text }),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      const data = yield response.json();

      yield put(updateTodoSuccess({ id: data.id, text: data.title }));
    }
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleClearCompletedTodos() {
  try {
    const todos = yield select(state => state.todos.items);
    const completedTodos = todos.filter(todo => todo.completed);

    for (const todo of completedTodos) {
      if (todo.id <= 200) { 
        yield call(fetch, `${API_URL}/${todo.id}`, {
          method: 'DELETE',
        });
      }
      yield put(deleteTodoSuccess(todo.id)); 
    }

    yield put(clearCompletedTodosSuccess());
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

export function* watchTodos() {
  yield takeLatest(addTodoRequest.type, handleAddTodo);
  yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
  yield takeEvery(toggleTodoRequest.type, handleToggleTodo);
  yield takeEvery(deleteTodoRequest.type, handleDeleteTodo);
  yield takeLatest(updateTodoRequest.type, handleUpdateTodo);
  yield takeLatest(clearCompletedTodosRequest.type, handleClearCompletedTodos); 
}
