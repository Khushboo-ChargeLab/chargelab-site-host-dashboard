import { put, takeEvery, call } from 'redux-saga/effects';
import { getChargers } from '../../services/overview/charger.service';
import { fetchChargers, fetchTroubleChargers, fetchChargersSuccess, fetchTroubleChargersSuccess } from '../reducers/charger.reducer';

function* watchFetchAllChargers(action:any): any {
    const response = yield call(getChargers, action.payload);
    yield put(fetchChargersSuccess(response));
}

function* watchFetchTroubleChargers(action:any): any {
    const response = yield call(getChargers, action.payload);
    yield put(fetchTroubleChargersSuccess(response));
}

function* chargersSaga() {
    yield takeEvery(fetchChargers, watchFetchAllChargers);
    yield takeEvery(fetchTroubleChargers, watchFetchTroubleChargers);
}

export default chargersSaga;