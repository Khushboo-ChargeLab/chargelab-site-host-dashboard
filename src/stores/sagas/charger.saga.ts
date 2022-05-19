import { put, takeEvery, call } from 'redux-saga/effects';
import { getChargers, getChargerDetail, updateCharger } from '../../services/overview/charger.service';
import { fetchChargerDetail, fetchChargerDetailSuccess, fetchChargers, fetchTroubleChargers, fetchChargersSuccess, fetchTroubleChargersSuccess, updateChargerInformation, updateChargerInformationSuccess } from '../reducers/charger.reducer';

function* watchFetchAllChargers(action:any): any {
    const response = yield call(getChargers, action.payload);
    yield put(fetchChargersSuccess(response));
}

function* watchFetchTroubleChargers(action:any): any {
    const response = yield call(getChargers, action.payload);
    yield put(fetchTroubleChargersSuccess(response));
}

function* watchFetchChargerDetail(action:any): any {
    const response = yield call(getChargerDetail, action.payload.id);
    yield put(fetchChargerDetailSuccess(response));
}
function* watchUpdateChargerInformation(action: any): any {
    const response = yield call(updateCharger, action.payload.id, action.payload);
    // FIX ME : Need to fix once we start getting updated entity from BE
    yield put(updateChargerInformationSuccess({ response, updatedChargerInfo: action.payload }));
}

function* chargersSaga() {
    yield takeEvery(fetchChargers, watchFetchAllChargers);
    yield takeEvery(fetchTroubleChargers, watchFetchTroubleChargers);
    // TODO: CB use BE data from API
    yield takeEvery(fetchChargerDetail, watchFetchChargerDetail);
    yield takeEvery(updateChargerInformation, watchUpdateChargerInformation);
}

export default chargersSaga;