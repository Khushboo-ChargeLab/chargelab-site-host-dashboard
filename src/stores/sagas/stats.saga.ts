import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getStatistics } from '../../services/overview/stats.service';
import { fetchStatistics, fetchStatisticsCSVRequest, fetchStatisticsCSVSuccess, fetchStatisticsSuccess } from '../reducers/stats.reducer';
import { selectRecentStatsFilter, selectStatsCSVFilter } from '../selectors/stats.selector';

function* fetchAllStats(): any {
    const filters = yield select(selectRecentStatsFilter);
    const response = yield call(getStatistics, filters);
    yield put(fetchStatisticsSuccess(response));
}

function* fetchAllStatsCSV(): any {
    const filter = yield select(selectStatsCSVFilter);
    const response = yield call(getStatistics, filter);
    yield put(fetchStatisticsCSVSuccess(response));
}

function* statsSaga() {
    yield takeEvery(fetchStatistics, fetchAllStats);
    yield takeEvery(fetchStatisticsCSVRequest, fetchAllStatsCSV);
}

export default statsSaga;