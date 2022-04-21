import { all, fork } from 'redux-saga/effects';
import chargersSaga from './charger.saga';
import locationSaga from './location.saga';
import sessionsSaga from './sessions.saga';

export function* rootSaga() {
    yield all([fork(sessionsSaga), fork(locationSaga), fork(chargersSaga)]);
}