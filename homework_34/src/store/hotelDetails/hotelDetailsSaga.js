import { call, put, takeLatest } from 'redux-saga/effects';
import api from '@/services/axiosService';
import {
  fetchHotelRequest,
  fetchHotelSuccess,
  fetchHotelFailure,
  bookHotelRequest,
  bookHotelSuccess,
  bookHotelFailure,
} from './hotelDetailsSlice';

function* fetchHotelSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(api.get, `/hotels/${id}`);
    yield put(fetchHotelSuccess(response.data));
  } catch (error) {
    yield put(fetchHotelFailure(error.message));
  }
}

function* bookHotelSaga(action) {
  try {
    const { id } = action.payload;
    yield call(api.patch, `/hotels/${id}`, { booked: true });
    yield put(bookHotelSuccess());
    yield put(fetchHotelRequest({ id }));
  } catch (error) {
    yield put(bookHotelFailure(error.message));
  }
}

export function* hotelDetailsSaga() {
  yield takeLatest(fetchHotelRequest.type, fetchHotelSaga);
  yield takeLatest(bookHotelRequest.type, bookHotelSaga);
}
