import api from '../../api';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    loadEditProfileDataSuccess,
    loadEditProfileDataError,
    loadViewProfileDataSuccess,
    loadViewProfileDataError,
    updateProfileImageSuccess,
    updateProfileImageError,
    updateProfileSuccess,
    updateProfileError,
    loadProfileAvatarSuccess,
    loadProfileAvatarError,
    changeFollowingSuccess,
    changeFollowingError
} from './actions';
import types from './types';

function* callLoadViewProfileData(action) {
    try {
        const response = yield call(api.call.get, `${api.urls.profile.loadViewProfileData_get}?username=${action.payload}`);
        yield put(loadViewProfileDataSuccess(response.data.model));
    } catch (e) {
        yield put(loadViewProfileDataError(e));
    }
}

function* callLoadEditProfileData(action) {
    try {
        const response = yield call(api.call.get, `${api.urls.profile.loadEditProfileData_get}?username=${action.payload}`);
        yield put(loadEditProfileDataSuccess(response.data.model));
    } catch (e) {
        yield put(loadEditProfileDataError(e));
    }
}

function* callUpdateProfileImage(action) {
    try {
        const response = yield call(api.call.post, `${api.urls.profile.updateProfileImage_post}?username=${action.payload.get('userName')}`, action.payload);
        yield put(updateProfileImageSuccess(response.data.model));
    } catch (e) {
        yield put(updateProfileImageError(e));
    }
}

function* callUpdateProfile(action) {
    try {
        yield call(api.call.post, api.urls.profile.updateProfile_post, action.payload);
        yield put(updateProfileSuccess());
    } catch (e) {
        yield put(updateProfileError(e));
    }
}

function* callLoadProfileAvatar() {
    try {
        const response = yield call(api.call.get, api.urls.profile.loadProfileAvatar_get);
        yield put(loadProfileAvatarSuccess(response.data.model));
    } catch (e) {
        yield put(loadProfileAvatarError(e));
    }
}

function* callChangeFollowing(action) {
    try {
        yield call(api.call.post, api.urls.profile.changeFollowing_post, action.payload);
        yield put(changeFollowingSuccess());
    } catch (e) {
        yield put(changeFollowingError(e));
    }
}

export default [
    takeEvery(types.LOAD_VIEW_PROFILE_DATA, callLoadViewProfileData),
    takeEvery(types.LOAD_EDIT_PROFILE_DATA, callLoadEditProfileData),
    takeEvery(types.UPDATE_PROFILE_IMAGE, callUpdateProfileImage),
    takeEvery(types.UPDATE_PROFILE, callUpdateProfile),
    takeEvery(types.LOAD_PROFILE_AVATAR, callLoadProfileAvatar),
    takeEvery(types.CHANGE_FOLLOWING, callChangeFollowing)
];
