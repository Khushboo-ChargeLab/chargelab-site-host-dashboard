import { put, takeEvery, call, select } from 'redux-saga/effects';
import { getRecentSessions } from '../../services/overview/session.service';
import { fetchSessions, fetchSessionsSuccess } from '../reducers/sessons.reducer';
import { selectRecentSessionFilter } from '../selectors/session.selector';

function* fetchRecentSessions(): any {
    const filters = yield select(selectRecentSessionFilter);
    const response = yield call(getRecentSessions, filters);
    yield put(fetchSessionsSuccess(response));
}

function* sessionsSaga() {
    yield takeEvery(fetchSessions, fetchRecentSessions);
}

export default sessionsSaga;