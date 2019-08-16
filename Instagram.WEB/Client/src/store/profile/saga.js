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
    loadFollowersSuccess,
    loadFollowersError,
    loadFollowingSuccess,
    loadFollowingError,
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

function* callFollow(action) {
    try {
        yield call(api.call.post, api.urls.profile.follow_post, action.payload);

        const state = yield select();

        const { user, profile } = state;
        const { userName } = action.payload;

        const viewData = updateViewData(profile.viewData, user.userName, userName, true);
        const followers = updateFollowers(profile.followers, userName, true);
        const following = updateFollowers(profile.following, userName, true);

        yield put(followSuccess({ viewData, followers, following }));
    } catch (e) {
        yield put(followError(e));
    }
}

function* callUnfollow(action) {
    try {
        yield call(api.call.post, api.urls.profile.unfollow_post, action.payload);

        const state = yield select();

        const { user, profile } = state;
        const { userName } = action.payload;

        const viewData = updateViewData(profile.viewData, user.userName, userName, false);
        const followers = updateFollowers(profile.followers, userName, false);
        const following = updateFollowers(profile.following, userName, false);

        yield put(unfollowSuccess({ viewData, followers, following }));
    } catch (e) {
        yield put(unfollowError(e));
    }
}

function* callLoadFollowers(action) {
    try {
        const response = yield call(api.call.get, `${api.urls.profile.loadFollowers_post}?username=${action.payload}`);
        yield put(loadFollowersSuccess(response.data.model));
    } catch (e) {
        yield put(loadFollowersError(e));
    }
}

function* callLoadFollowing(action) {
    try {
        const response = yield call(api.call.get, `${api.urls.profile.loadFollowing_post}?username=${action.payload}`);
        yield put(loadFollowingSuccess(response.data.model));
    } catch (e) {
        yield put(loadFollowingError(e));
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
        let result = { ...p };
        if (result.userName === followerUserName) {
            result.isFollowing = isFollow;
        }

        return result;
    });
};

export default [
    takeEvery(types.LOAD_VIEW_PROFILE_DATA, callLoadViewProfileData),
    takeEvery(types.LOAD_EDIT_PROFILE_DATA, callLoadEditProfileData),
    takeEvery(types.UPDATE_PROFILE_IMAGE, callUpdateProfileImage),
    takeEvery(types.UPDATE_PROFILE, callUpdateProfile),
    takeEvery(types.LOAD_PROFILE_AVATAR, callLoadProfileAvatar),
    takeEvery(types.FOLLOW, callFollow),
    takeEvery(types.UNFOLLOW, callUnfollow),
    takeEvery(types.LOAD_FOLLOWERS, callLoadFollowers),
    takeEvery(types.LOAD_FOLLOWING, callLoadFollowing),

];
