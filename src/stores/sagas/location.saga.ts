import { put, takeEvery, call } from 'redux-saga/effects';
import { getLocations } from '../../services/overview/location.service';
import { fetchLocations, fetchLocationsSuccess } from '../reducers/location.reducer';

function* fetchAllLocations(): any {
    const response = yield call(getLocations);

    yield put(fetchLocationsSuccess(response));
}

function* locationSaga() {
    yield takeEvery(fetchLocations, fetchAllLocations);
}

export default locationSaga;