import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: []
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({ id: Date.now(), text: action.payload });
      
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;