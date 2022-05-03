import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getTransactionReport } from '../../services/overview/transaction.service';
import { fetchTransactionReport, fetchTransactionReportSuccess } from '../reducers/transactionReport.reducer';
import { getTransactionReportFilter } from '../selectors/transactionReport.selector';

function* fetchTransactionReportAsCSV(): any {
    const filter = yield select(getTransactionReportFilter);
    const response = yield call(getTransactionReport, filter);
    yield put(fetchTransactionReportSuccess(response));
}

function* transactionReportSaga() {
    yield takeEvery(fetchTransactionReport, fetchTransactionReportAsCSV);
}

export default transactionReportSaga;