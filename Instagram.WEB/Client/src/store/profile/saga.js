import api from '../../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loadProfileDataSuccess, loadProfileDataError } from './actions';
import types from './types';

function* callLoadProfileData(action) {
    try {
        var response = yield call(api.call.get, `${api.urls.profile.profileData}?username=${action.payload}`);
        yield put(loadProfileDataSuccess(response.data.model));
    } catch (e) {
        yield put(loadProfileDataError(e));
    }
}

export default [
    takeEvery(types.LOAD_PROFILE_DATA, callLoadProfileData)
];
