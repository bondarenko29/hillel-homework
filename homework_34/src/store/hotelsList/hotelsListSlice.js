import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotels: [],
  loading: false,
  error: null,
};

const hotelsListSlice = createSlice({
  name: 'hotelsList',
  initialState,
  reducers: {
    fetchHotelsRequest: state => {
      state.loading = true;
      state.error = null;
    },

    fetchHotelsSuccess: (state, action) => {
      state.loading = false;
      state.hotels = action.payload;
    },

    fetchHotelsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearHotelsList: state => {
      state.hotels = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { fetchHotelsRequest, fetchHotelsSuccess, fetchHotelsFailure, clearHotelsList } =
  hotelsListSlice.actions;

export default hotelsListSlice.reducer;
