import { combineReducers } from '@reduxjs/toolkit';
import hotelDetailsReducer from './hotelDetails/hotelDetailsSlice';
import hotelsListReducer from './hotelsList/hotelsListSlice';
const rootReducer = combineReducers({
  hotelDetails: hotelDetailsReducer,
  hotelsList: hotelsListReducer,
});

export default rootReducer;
