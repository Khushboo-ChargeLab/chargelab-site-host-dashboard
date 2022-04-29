import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getStatistics } from '../../services/overview/stats.service';
import { fetchStatistics, fetchStatisticsSuccess } from '../reducers/stats.reducer';
import { selectRecentStatsFilter } from '../selectors/stats.selector';

function* fetchAllStats(): any {
    const filters = yield select(selectRecentStatsFilter);
    const response = yield call(getStatistics, filters);
    yield put(fetchStatisticsSuccess(response));
}

function* statsSaga() {
    yield takeEvery(fetchStatistics, fetchAllStats);
}

export default statsSaga;