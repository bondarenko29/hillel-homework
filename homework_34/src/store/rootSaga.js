import { all } from 'redux-saga/effects';
import { hotelDetailsSaga } from './hotelDetails/hotelDetailsSaga';
import { hotelsListSaga } from './hotelsList/hotelsListSaga';
export default function* rootSaga() {
  yield all([hotelDetailsSaga(), hotelsListSaga()]);
}
