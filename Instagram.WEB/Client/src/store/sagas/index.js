import { all } from 'redux-saga/effects';
import userSaga from '../user/saga';
import profileSaga from '../profile/saga';

export default function* rootSaga() {
    yield all([
        ...userSaga,
        ...profileSaga
    ]);
}
