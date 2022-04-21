import { put, takeEvery } from 'redux-saga/effects';
import { fetchTransactions } from '../reducers/transactions.reducer';

const API_PATH = '/internal/core/v2/historical/transactions';

function* fetch(filter: any) {
  yield put({ type: 'INCREMENT' });
}

function* transactionsSaga() {
  yield takeEvery(fetchTransactions, fetch);
}

export default transactionsSaga;
