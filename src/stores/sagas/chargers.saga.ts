import { put, takeEvery } from 'redux-saga/effects';
import { fetchChargers } from '../reducers/chargers.reducer';

function* fetch(filter: any) {
  yield put({ type: 'INCREMENT' });
}

function* chargersSaga() {
  yield takeEvery(fetchChargers, fetch);
}

export default chargersSaga;
