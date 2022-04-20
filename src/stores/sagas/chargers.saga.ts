import { put, takeEvery } from 'redux-saga/effects';
import { fetchChargers } from '../reducers/chargers.reducer';

const API_PATH = '/internal/core/v2/chargers';

function* fetch(filter: any) {
  yield put({ type: 'INCREMENT' });
}

function* chargersSaga() {
  yield takeEvery(fetchChargers, fetch);
}

export default chargersSaga;
