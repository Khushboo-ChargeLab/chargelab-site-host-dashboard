import { put, takeEvery } from 'redux-saga/effects';
import { fetchSessions } from '../reducers/sessons.reducer';
import { setCurrentTheme } from '../reducers/theme.reduer';

function* fetchRecentSessions() {
    console.log('fetchRecentSessions');
    yield put({ type: 'INCREMENT' });
}

function* sessionsSaga() {
    yield takeEvery(fetchSessions, fetchRecentSessions);
}

export default sessionsSaga;