import { put, takeEvery } from 'redux-saga/effects';
import { fetchLocations } from '../reducers/locations.reducer';

function* fetch(filter: any) {
  yield put({ type: 'INCREMENT' });
}

function* locationsSaga() {
  yield takeEvery(fetchLocations, fetch);
}

export default locationsSaga;
