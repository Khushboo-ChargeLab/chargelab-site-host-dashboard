import { put, takeEvery } from 'redux-saga/effects';
import { fetchSessions } from '../reducers/sessons.reducer';

function* fetchRecentSessions(filter: any) {
    console.log('fetchRecentSessions', filter);
    yield put({ type: 'INCREMENT' });
}

function* sessionsSaga() {
    yield takeEvery(fetchSessions, fetchRecentSessions);
}

export default sessionsSaga;