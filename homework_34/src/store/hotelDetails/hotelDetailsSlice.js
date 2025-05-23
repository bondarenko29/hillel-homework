import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotel: null,
  loading: false,
  error: null,
  bookingInProgress: false,
};

const hotelDetailsSlice = createSlice({
  name: 'hotelDetails',
  initialState,
  reducers: {
    fetchHotelRequest: state => {
      state.loading = true;
      state.error = null;
    },

    fetchHotelSuccess: (state, action) => {
      state.loading = false;
      state.hotel = action.payload;
    },

    fetchHotelFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    bookHotelRequest: state => {
      state.bookingInProgress = true;
      state.error = null;
    },

    bookHotelSuccess: state => {
      state.bookingInProgress = false;
    },

    bookHotelFailure: (state, action) => {
      state.bookingInProgress = false;
      state.error = action.payload;
    },

    clearHotelDetails: state => {
      state.hotel = null;
      state.loading = false;
      state.error = null;
      state.bookingInProgress = false;
    },
  },
});

export const {
  fetchHotelRequest,
  fetchHotelSuccess,
  fetchHotelFailure,
  bookHotelRequest,
  bookHotelSuccess,
  bookHotelFailure,
  clearHotelDetails,
} = hotelDetailsSlice.actions;

export default hotelDetailsSlice.reducer;
