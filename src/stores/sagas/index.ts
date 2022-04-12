import { all, fork } from 'redux-saga/effects';
import sessionsSaga from './sessions.saga';

export function* rootSaga() {
    yield all([fork(sessionsSaga)]);
}