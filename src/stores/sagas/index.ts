import { all, fork } from 'redux-saga/effects';
import sessionsSaga from './sessions.saga';
import transactionsSaga from './transactions.saga';
import chargersSaga from './charger.saga';
import locationSaga from './location.saga';

export function* rootSaga() {
  yield all([
    fork(sessionsSaga),
    fork(locationSaga),
    fork(transactionsSaga),
    fork(chargersSaga),
  ]);
}
