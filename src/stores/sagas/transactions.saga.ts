import { put, takeEvery } from 'redux-saga/effects';
import { fetchTransactions } from '../reducers/transactions.reducer';

function* fetch(filter: any) {
  yield put({ type: 'INCREMENT' });
}

function* transactionsSaga() {
  yield takeEvery(fetchTransactions, fetch);
}

export default transactionsSaga;
