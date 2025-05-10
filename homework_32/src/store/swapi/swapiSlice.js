import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  people: [],
  loading: false,
  error: null,
  page: 1,
  count: 0, 
  totalPagesFromApi: 0,
  next: null, 
  previous: null,
};

const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    fetchPeopleRequest: (state, action) => { 
      state.loading = true;
      state.error = null;
      if (action.payload && action.payload.page) {
        state.page = action.payload.page;
      }
    },
    fetchPeopleSuccess: (state, action) => {
      state.people = action.payload.results; 
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.totalPagesFromApi = action.payload.totalPagesFromApi || 0; 
      state.loading = false;
      state.error = null;
    },
    fetchPeopleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSwapiPage(state, action) {
      if (state.page !== action.payload) { 
        state.page = action.payload;
      }
    },
  },
});

export const {
  fetchPeopleRequest,
  fetchPeopleSuccess,
  fetchPeopleFailure,
  setSwapiPage,
} = swapiSlice.actions;

export default swapiSlice.reducer;