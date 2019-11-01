import types from './types';
import { createAction } from 'redux-actions';

export const loadViewProfileData = createAction(types.LOAD_VIEW_DATA);
export const loadViewProfileDataSuccess = createAction(types.LOAD_VIEW_DATA_SUCCESS);
export const loadViewProfileDataError = createAction(types.LOAD_VIEW_DATA_ERROR, error => error);

export const loadEditProfileData = createAction(types.LOAD_EDIT_DATA);
export const loadEditProfileDataSuccess = createAction(types.LOAD_EDIT_DATA_SUCCESS);
export const loadEditProfileDataError = createAction(types.LOAD_EDIT_DATA_ERROR, error => error);

export const updateProfileImage = createAction(types.UPDATE_IMAGE, data => data);
export const updateProfileImageSuccess = createAction(types.UPDATE_IMAGE_SUCCESS);
export const updateProfileImageError = createAction(types.UPDATE_IMAGE_ERROR, error => error);

export const updateProfile = createAction(types.UPDATE);
export const updateProfileSuccess = createAction(types.UPDATE_SUCCESS);
export const updateProfileError = createAction(types.UPDATE_ERROR, error => error);

export const loadProfileAvatar = createAction(types.LOAD_AVATAR);
export const loadProfileAvatarSuccess = createAction(types.LOAD_AVATAR_SUCCESS);
export const loadProfileAvatarError = createAction(types.LOAD_AVATAR_ERROR, error => error);

export const follow = createAction(types.FOLLOW);
export const followSuccess = createAction(types.FOLLOW_SUCCESS);
export const followError = createAction(types.FOLLOW_ERROR);

export const unfollow = createAction(types.UNFOLLOW);
export const unfollowSuccess = createAction(types.UNFOLLOW_SUCCESS);
export const unfollowError = createAction(types.UNFOLLOW_ERROR);