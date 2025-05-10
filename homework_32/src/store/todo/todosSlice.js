import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;

const initialState = {
  items: [], 
  loading: false, 
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    
    addTodoSuccess: (state, action) => {
      state.items.push({ id: nextTodoId++, text: action.payload, completed: false });
    },
    toggleTodoSuccess: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodoSuccess: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    addTodoRequest: (state) => { 
      state.error = null;
    },
    toggleTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    todoOperationFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
  },
});

export const {
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
  todoOperationFailed
} = todosSlice.actions;

export default todosSlice.reducer;