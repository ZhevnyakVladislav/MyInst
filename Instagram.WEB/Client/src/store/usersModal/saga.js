import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import api from '../../api';
import types from './types';
import {
    loadDataSuccess,
    loadDataError
} from './actions';
import { UrlsByType } from '../../common/usersModal/constants';

function* callLoadData() {
    try {
        const state = yield select();
        const usersModal = state.usersModal;
        const url = UrlsByType[usersModal.modalType](usersModal.userName);
        const response = yield call(api.call.get, url);

        yield put(loadDataSuccess(response.data.model));
    } catch (e) {
        yield put(loadDataError(e));
    }
}

export default function* saga() {
    yield all([
        takeEvery(types.LOAD_DATA, callLoadData),
    ]);
}