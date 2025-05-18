import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.map(item => ({ ...item, id: Number(item.id) }));
    },
    addTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    toggleTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    toggleTodoSuccess: (state, action) => {
      console.log('toggleTodoSuccess Reducer received:', action.payload);
      state.loading = false;
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
    deleteTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTodoSuccess: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    
    clearCompletedTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    clearCompletedTodosSuccess: (state) => {
      state.loading = false;
      state.items = state.items.filter(item => !item.completed);
    },
    todoOperationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  addTodoRequest,
  addTodoSuccess,
  toggleTodoRequest,
  toggleTodoSuccess,
  deleteTodoRequest,
  deleteTodoSuccess,
  updateTodoRequest,
  updateTodoSuccess,
  clearCompletedTodosRequest,
  clearCompletedTodosSuccess,
  todoOperationFailed,
} = todosSlice.actions;

export default todosSlice.reducer;

