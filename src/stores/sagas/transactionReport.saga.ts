import { call, put, takeEvery } from 'redux-saga/effects';
import { getTransactionReport } from '../../services/overview/transaction.service';
import { fetchTransactionReport, fetchTransactionReportSuccess } from '../reducers/transactionReport.reducer';

function* fetchTransactionReportAsCSV(): any {
    const response = yield call(getTransactionReport);
    console.log('response in saga :>> ', response);
    yield put(fetchTransactionReportSuccess(response));
}

function* transactionReportSaga() {
    yield takeEvery(fetchTransactionReport, fetchTransactionReportAsCSV);
}

export default transactionReportSaga;