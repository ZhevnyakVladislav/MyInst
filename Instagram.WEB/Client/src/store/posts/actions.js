import types from './types';
import { createAction } from 'redux-actions';

export const loadProfilePosts = createAction(types.LOAD_PROFILE_POSTS, data => data);
export const loadProfilePostsSuccess = createAction(types.LOAD_PROFILE_POSTS_SUCCESS);
export const loadProfilePostsError = createAction(types.LOAD_PROFILE_POSTS_ERROR, error => error);