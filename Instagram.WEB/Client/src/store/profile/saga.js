import api from '../../api';
import { call, put, takeEvery, select } from 'redux-saga/effects';
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
    followSuccess,
    followError,
    unfollowSuccess,
    unfollowError
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

function* callFollow({ payload }) {
    try {
        yield call(api.call.post, api.urls.profile.follow_post, payload);

        const state = yield select();
        const { userName: currentUserName } = state.user.data;
        let { viewData } = state.profile;
        const { userName } = payload;
        let followers = state.usersModal && state.usersModal.data || [];

        viewData = updateViewData(viewData, currentUserName, userName, true);
        followers = updateFollowers(followers, userName, true);

        yield put(followSuccess({ viewData, data: followers }));
    } catch (e) {
        yield put(followError(e));
    }
}

function* callUnfollow({ payload }) {
    try {
        yield call(api.call.post, api.urls.profile.unfollow_post, payload);

        const state = yield select();

        const { userName: currentUserName } = state.user.data;
        let { viewData } = state.profile;
        const { userName } = payload;
        let followers = state.usersModal && state.usersModal.data || [];

        viewData = updateViewData(viewData, currentUserName, userName, false);
        followers = updateFollowers(followers, userName, false);

        yield put(unfollowSuccess({ viewData, data: followers }));
    } catch (e) {
        yield put(unfollowError(e));
    }
}

const updateViewData = (prevViewData, currentUserName, followersUserName, isFollow) => {
    const viewData = {};
    if (prevViewData.userName === currentUserName) {
        prevViewData.followingCount = isFollow
            ? prevViewData.followingCount + 1
            : prevViewData.followingCount - 1;
    }

    if (prevViewData.userName === followersUserName) {
        prevViewData.followersCount = isFollow
            ? prevViewData.followersCount + 1
            : prevViewData.followersCount - 1;
        prevViewData.isFollowing = isFollow;
    }

    return viewData;
};

const updateFollowers = (prevFollowers, followerUserName, isFollow) => {
    return prevFollowers.map(p => {
        if (p.userName === followerUserName) {
            p.isFollowing = isFollow;
        }
        return p;
    });
};

export default [
    takeEvery(types.LOAD_VIEW_DATA, callLoadViewProfileData),
    takeEvery(types.LOAD_EDIT_DATA, callLoadEditProfileData),
    takeEvery(types.UPDATE_IMAGE, callUpdateProfileImage),
    takeEvery(types.UPDATE, callUpdateProfile),
    takeEvery(types.LOAD_AVATAR, callLoadProfileAvatar),
    takeEvery(types.FOLLOW, callFollow),
    takeEvery(types.UNFOLLOW, callUnfollow),
];
