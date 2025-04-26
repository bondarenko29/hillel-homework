import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPeople = createAsyncThunk('people/fetchPeople', async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (Array.isArray(data.results)) {
    const peopleDetails = await Promise.all(
      data.results.map(async (person) => {
        const res = await fetch(person.url);
        const personData = await res.json();
        return personData.result.properties;
      })
    );
    return peopleDetails;
  } else if (data.result && data.result.properties) {
    return [data.result.properties];
  } else {
    return [];
  }
});

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    peopleList: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearPeople: (state) => {
      state.peopleList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.peopleList = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearPeople } = peopleSlice.actions;
export default peopleSlice.reducer;
