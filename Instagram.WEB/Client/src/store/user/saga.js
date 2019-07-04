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
    confirmEmailSuccess,
    confirmEmailError,
    confirmResetPasswordSuccess,
    confirmResetPasswordError,
    resetPasswordSuccess,
    resetPasswordError,
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
        yield call(api.call.post, api.urls.user.signUp_post, action.payload);
        yield put(signUpSuccess());
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

function* callConfirmEmail(action) {
    try {
        const response = yield call(api.call.post, api.urls.user.confirmEmail_post, action.payload);
        yield put(confirmEmailSuccess(response.data.model));
    } catch (e) {
        yield put(confirmEmailError(e));

    }
}

function* callConfirmResetPassword(action) {
    try {
        yield call(api.call.post, api.urls.user.confirmResetPassword_post, action.payload);
        yield put(confirmResetPasswordSuccess());
    } catch (e) {
        yield put(confirmResetPasswordError(e));
    }
}

function* callResetPassword(action) {
    try {
        yield call(api.call.post, api.urls.user.resetPassword_post, action.payload);
        yield put(resetPasswordSuccess());
    } catch (e) {
        yield put(resetPasswordError(e));
    }
}

export default [
    takeEvery(types.USER_SIGN_UP, callSignUp),
    takeEvery(types.USER_SIGN_IN, callSignIn),
    takeEvery(types.USER_LOGOUT, callLogOut),
    takeEvery(types.CONFIRM_EMAIL, callConfirmEmail),
    takeEvery(types.CONFIRM_RESET_PASSWORD, callConfirmResetPassword),
    takeEvery(types.RESET_PASSWORD, callResetPassword),
];