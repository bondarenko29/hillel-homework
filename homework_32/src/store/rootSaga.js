import { all } from 'redux-saga/effects';
import { watchTodos } from './todo/todoSaga';
import { watchSwapi } from './swapi/swapiSaga';

export default function* rootSaga() {
  yield all([
    watchTodos(),
    watchSwapi(),
   
  ]);
}