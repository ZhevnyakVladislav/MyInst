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

export const changeFollowing = createAction(types.CHANGE_FOLLOWING);
export const changeFollowingSuccess = createAction(types.CHANGE_FOLLOWING_SUCCESS);
export const changeFollowingError = createAction(types.CHANGE_FOLLOWING_ERROR);
