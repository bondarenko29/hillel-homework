import { all } from 'redux-saga/effects';
import { watchTodos } from './todo/todoSaga';

export default function* rootSaga() {
  yield all([
    watchTodos(),
   
  ]);
}