import api from '../../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import { push } from 'connected-react-router';
import types from './types';
import querystring from 'querystring';
import { setAccessToken } from '../../utils/localStorage';
import {
    signInSuccess,
    signInError,
    signUpSuccess,
    signUpError,
    confirmEmailSuccess,
    confirmEmailError,
    confirmResetPasswordSuccess,
    confirmResetPasswordError,
    resetPasswordSuccess,
    resetPasswordError,
    changePasswordSuccess,
    changePasswordError,
} from './actions';

function* callSignIn(action) {
    try {
        const response = yield call(api.call.post, api.urls.user.signIn_post,
            querystring.stringify(
                {
                    grant_type: 'password',
                    ...action.payload
                }
            ),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        setAccessToken(response.data.access_token);
        const decodedData = jwt_decode(response.data.access_token);
        yield put(signInSuccess({ userName: decodedData.userName }));
        yield put(push('/'));
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
        yield put(push('/account/login'));
    } catch (e) {
        yield put(resetPasswordError(e));
    }
}

function* callChangePassword(action) {
    try {
        yield call(api.call.post, api.urls.user.changePassword_post, action.payload);
        yield put(changePasswordSuccess());
    } catch (e) {
        yield put(changePasswordError(e));
    }
}

export default [
    takeEvery(types.USER_SIGN_UP, callSignUp),
    takeEvery(types.USER_SIGN_IN, callSignIn),
    takeEvery(types.CONFIRM_CODE, callConfirmEmail),
    takeEvery(types.CONFIRM_RESET_PASSWORD, callConfirmResetPassword),
    takeEvery(types.RESET_PASSWORD, callResetPassword),
    takeEvery(types.CHANGE_PASSWORD, callChangePassword),
];