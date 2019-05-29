import api from '../../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import types from './types';

function* callSignIn(action) {
    try {
        const response = yield call(
            api.call.post,
            api.urls.user.signIn,
            action.payload
        );
        yield put(createAction(types.USER_SIGN_IN_SUCCESS));
    } catch (e) {
        yield put(createAction(types.USER_SIGN_IN_ERROR, e.response.data));
    }
}

function* callSignUp(action) {
    try {
        const response = yield call(
            api.call.post,
            api.urls.user.signUp,
            action.payload
        );
        yield put(createAction(types.USER_SIGN_IN_SUCCESS));
    } catch (e) {
        yield put(createAction(types.USER_SIGN_UP_ERROR, e.response));
    }
}

export default [
    takeEvery(types.USER_SIGN_UP, callSignUp),
    takeEvery(types.USER_SIGN_IN, callSignIn)
];