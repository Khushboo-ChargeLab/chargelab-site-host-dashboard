import { all, fork } from 'redux-saga/effects';
import sessionsSaga from './sessions.saga';
import locationsSaga from './locations.saga';
import transactionsSaga from './transactions.saga';
import chargersSaga from './chargers.saga';

export function* rootSaga() {
  yield all([
    fork(sessionsSaga),
    fork(locationsSaga),
    fork(transactionsSaga),
    fork(chargersSaga),
  ]);
}
