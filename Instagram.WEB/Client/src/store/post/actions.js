import types from './types';
import { createAction } from 'redux-actions';

export const openModal = createAction(types.OPEN_DETAIL_MODAL);
export const closeModal = createAction(types.CLOSE_DETAIL_MODAL);

export const loadData = createAction(types.LOAD_DETAIL_DATA);
export const loadDataSuccess = createAction(types.LOAD_DETAIL_DATA_SUCCESS);
export const loadDataError = createAction(types.LOAD_DETAIL_DATA_ERROR);

export const loadProfilePosts = createAction(types.LOAD_PROFILE_POSTS);
export const loadProfilePostsSuccess = createAction(types.LOAD_PROFILE_POSTS_SUCCESS);
export const loadProfilePostsError = createAction(types.LOAD_PROFILE_POSTS_ERROR);

export const loadFollowingPosts = createAction(types.LOAD_FOLLOWING_POSTS);
export const loadFollowingPostsSuccess = createAction(types.LOAD_FOLLOWING_POSTS_SUCCESS);
export const loadFollowingPostsError = createAction(types.LOAD_FOLLOWING_POSTS_ERROR);

export const postComment = createAction(types.POST_COMMENT);
export const postCommentSuccess = createAction(types.POST_COMMENT_SUCCESS);
export const postCommentError = createAction(types.POST_COMMENT_ERROR);

export const deleteComment = createAction(types.DELETE_COMMENT);
export const deleteCommentSuccess = createAction(types.DELETE_COMMENT_SUCCESS);
export const deleteCommentError = createAction(types.DELETE_COMMENT_ERROR);

export const postLike = createAction(types.POST_LIKE);
export const postLikeSuccess = createAction(types.POST_LIKE_SUCCESS);
export const postLikeError = createAction(types.POST_LIKE_ERROR);

export const deleteLike = createAction(types.DELETE_LIKE);
export const deleteLikeSuccess = createAction(types.DELETE_LIKE_SUCCESS);
export const deleteLikeError = createAction(types.DELETE_LIKE_ERROR);