import { put, takeEvery, call, select } from 'redux-saga/effects';
import { getRecentSessions, getSimpleStats } from '../../services/overview/session.service';
import { fetchSessions, fetchSessionsSuccess, fetchSimpleStat, fetchSimpleStatSuccess } from '../reducers/sessons.reducer';
import { selectRecentSessionFilter } from '../selectors/session.selector';

function* fetchRecentSessions(): any {
    const filters = yield select(selectRecentSessionFilter);
    const response = yield call(getRecentSessions, filters);
    yield put(fetchSessionsSuccess(response));
}

function* fetchSimpleStats(): any {
    const filters = yield select(selectRecentSessionFilter);
    const response = yield call(getSimpleStats, filters);
    yield put(fetchSimpleStatSuccess(response));
}

function* sessionsSaga() {
    yield takeEvery(fetchSessions, fetchRecentSessions);
    yield takeEvery(fetchSimpleStat, fetchSimpleStats);
}

export default sessionsSaga;