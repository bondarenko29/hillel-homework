import { call, put, takeLatest } from 'redux-saga/effects';
import api from '@/services/axiosService';
import { fetchHotelsRequest, fetchHotelsSuccess, fetchHotelsFailure } from './hotelsListSlice';

function* fetchHotelsSaga() {
  try {
    const response = yield call(api.get, '/hotels');
    yield put(fetchHotelsSuccess(response.data));
  } catch (error) {
    yield put(fetchHotelsFailure(error.message));
  }
}

export function* hotelsListSaga() {
  yield takeLatest(fetchHotelsRequest.type, fetchHotelsSaga);
}
