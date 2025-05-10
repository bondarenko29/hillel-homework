import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
  todoOperationFailed
} from './todosSlice';



function* handleAddTodo(action) {
  try {
    yield put(addTodoSuccess(action.payload)); 
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleToggleTodo(action) {
  try {
    yield put(toggleTodoSuccess(action.payload));
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}

function* handleDeleteTodo(action) {
  try {
    yield put(deleteTodoSuccess(action.payload)); 
  } catch (error) {
    yield put(todoOperationFailed(error.message));
  }
}


export function* watchTodos() {
  yield takeLatest(addTodoRequest.type, handleAddTodo);
  yield takeEvery(toggleTodoRequest.type, handleToggleTodo); 
  yield takeEvery(deleteTodoRequest.type, handleDeleteTodo);
}