import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todo/todosSlice';
import swapiReducer from './swapi/swapiSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
  swapi: swapiReducer,
});

export default rootReducer;