import { put, takeEvery, call } from 'redux-saga/effects';
import { getChargers } from '../../services/overview/charger.service';
import { fetchChargers, fetchChargersSuccess } from '../reducers/charger.reducer';

function* fetchAllChargers(): any {
    const response = yield call(getChargers);
    yield put(fetchChargersSuccess(response));
}

function* chargersSaga() {
    yield takeEvery(fetchChargers, fetchAllChargers);
}

export default chargersSaga;