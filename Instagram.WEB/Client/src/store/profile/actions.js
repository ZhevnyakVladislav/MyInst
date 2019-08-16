import types from './types';
import { createAction } from 'redux-actions';

export const loadViewProfileData = createAction(types.LOAD_VIEW_PROFILE_DATA);
export const loadViewProfileDataSuccess = createAction(types.LOAD_VIEW_PROFILE_DATA_SUCCESS);
export const loadViewProfileDataError = createAction(types.LOAD_VIEW_PROFILE_DATA_ERROR, error => error);

export const loadEditProfileData = createAction(types.LOAD_EDIT_PROFILE_DATA);
export const loadEditProfileDataSuccess = createAction(types.LOAD_EDIT_PROFILE_DATA_SUCCESS);
export const loadEditProfileDataError = createAction(types.LOAD_EDIT_PROFILE_DATA_ERROR, error => error);

export const updateProfileImage = createAction(types.UPDATE_PROFILE_IMAGE, data => data);
export const updateProfileImageSuccess = createAction(types.UPDATE_PROFILE_IMAGE_SUCCESS);
export const updateProfileImageError = createAction(types.UPDATE_PROFILE_IMAGE_ERROR, error => error);

export const updateProfile = createAction(types.UPDATE_PROFILE);
export const updateProfileSuccess = createAction(types.UPDATE_PROFILE_SUCCESS);
export const updateProfileError = createAction(types.UPDATE_PROFILE_ERROR, error => error);

export const loadProfileAvatar = createAction(types.LOAD_PROFILE_AVATAR);
export const loadProfileAvatarSuccess = createAction(types.LOAD_PROFILE_AVATAR_SUCCESS);
export const loadProfileAvatarError = createAction(types.LOAD_PROFILE_AVATAR_ERROR, error => error);

export const follow = createAction(types.FOLLOW);
export const followSuccess = createAction(types.FOLLOW_SUCCESS);
export const followError = createAction(types.FOLLOW_ERROR);

export const unfollow = createAction(types.UNFOLLOW);
export const unfollowSuccess = createAction(types.UNFOLLOW_SUCCESS);
export const unfollowError = createAction(types.UNFOLLOW_ERROR);

export const loadFollowers = createAction(types.LOAD_FOLLOWERS, data => data);
export const loadFollowersSuccess = createAction(types.LOAD_FOLLOWERS_SUCCESS);
export const loadFollowersError = createAction(types.LOAD_FOLLOWERS_ERROR);

export const loadFollowing = createAction(types.LOAD_FOLLOWING, data => data);
export const loadFollowingSuccess = createAction(types.LOAD_FOLLOWING_SUCCESS);
export const loadFollowingError = createAction(types.LOAD_FOLLOWING_ERROR);

export const openUnfollowModal = createAction(types.OPEN_UNFOLLOW_MODAL, data => data);
export const closeUnfollowModal = createAction(types.CLOSE_UNFOLLOW_MODAL);

