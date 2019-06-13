import api from '../../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loadProfileDataSuccess, loadProfileDataError } from './actions';
import types from './types';

function* callLoadProfileData(action) {
    try {
        const response = yield call(api.call.get, `${api.urls.profile.profileData_get}?username=${action.payload}`);
        yield put(loadProfileDataSuccess(response.data.model));
    } catch (e) {
        yield put(loadProfileDataError(e));
    }
}

export default [
    takeEvery(types.LOAD_PROFILE_DATA, callLoadProfileData)
];
