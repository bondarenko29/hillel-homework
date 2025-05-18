import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todo/todosSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;