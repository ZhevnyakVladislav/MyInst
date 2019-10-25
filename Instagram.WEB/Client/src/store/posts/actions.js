import types from './types';
import { createAction } from 'redux-actions';

export const loadProfilePosts = createAction(types.LOAD_PROFILE_POSTS, data => data);
export const loadProfilePostsSuccess = createAction(types.LOAD_PROFILE_POSTS_SUCCESS);
export const loadProfilePostsError = createAction(types.LOAD_PROFILE_POSTS_ERROR, error => error);

export const openPostModal = createAction(types.OPEN_POST_MODAL, data => data);
export const closePostModal = createAction(types.CLOSE_POST_MODAL);

export const postComment = createAction(types.POST_COMMENT, data => data);
export const postCommentSuccess = createAction(types.POST_COMMENT_SUCCESS, data => data);
export const postCommentError = createAction(types.POST_COMMENT_ERROR, error => error);

export const deleteComment = createAction(types.DELETE_COMMENT, data => data);
export const deleteCommentSuccess = createAction(types.DELETE_COMMENT_SUCCESS);
export const deleteCommentError = createAction(types.DELETE_COMMENT_ERROR, error => error);

export const likePost = createAction(types.LIKE_POST, data => data);
export const likePostSuccess = createAction(types.LIKE_POST_SUCCESS);
export const likePostError = createAction(types.LIKE_POST_ERROR, error => error);

export const deleteLike = createAction(types.DELETE_LIKE, data => data);
export const deleteLikeSuccess = createAction(types.DELETE_LIKE_SUCCESS);
export const deleteLikeError = createAction(types.DELETE_LIKE_ERROR, error => error);

export const loadPostData = createAction(types.LOAD_POST_DATA, data => data);
export const loadPostDataSuccess = createAction(types.LOAD_POST_DATA_SUCCESS);
export const loadPostDataError = createAction(types.LOAD_POST_DATA_ERROR, error => error);
