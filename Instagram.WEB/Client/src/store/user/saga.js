import api from '../../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import types from './types';
import { signUpError, signUpSuccess } from './actions';

function* callSignIn(action) {
    try {
        yield call(api.call.post, api.urls.user.signIn, action.payload);
        yield put(createAction({ type: types.USER_SIGN_IN_SUCCESS }));
    } catch (e) {
        yield put(createAction({ type: types.USER_SIGN_IN_ERROR, payload: e.response.data }));
    }
}

function* callSignUp(action) {
    try {
        yield call(api.call.post, api.urls.user.signUp, action.payload);
        yield put(signUpSuccess());
    } catch (e) {
        yield put(signUpError(e));
    }
}

export default [
    takeEvery(types.USER_SIGN_UP, callSignUp),
    takeEvery(types.USER_SIGN_IN, callSignIn)
];