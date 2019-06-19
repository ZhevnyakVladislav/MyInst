import api from '../../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import types from './types';
import {
    signInSuccess,
    signInError,
    signUpSuccess,
    signUpError,
    logOutSuccess,
    logOutError,
} from './actions';

function* callSignIn(action) {
    try {
        const response = yield call(api.call.post, api.urls.user.signIn_post, action.payload);
        yield put(signInSuccess(response.data.model));
    } catch (e) {
        yield put(signInError(e));
    }
}

function* callSignUp(action) {
    try {
        const response = yield call(api.call.post, api.urls.user.signUp_post, action.payload);
        yield put(signUpSuccess(response.data.model));
    } catch (e) {
        yield put(signUpError(e));
    }
}

function* callLogOut() {
    try {
        yield call(api.call.post, api.urls.user.logOut_post);
        yield put(logOutSuccess());
    } catch (e) {
        yield put(logOutError(e));
    }
}

export default [
    takeEvery(types.USER_SIGN_UP, callSignUp),
    takeEvery(types.USER_SIGN_IN, callSignIn),
    takeEvery(types.USER_LOGOUT, callLogOut),
];