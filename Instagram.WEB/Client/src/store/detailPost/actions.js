import types from './types';
import { createAction } from 'redux-actions';

export const openModal = createAction(types.OPEN_MODAL);
export const closeModal = createAction(types.CLOSE_MODAL);

export const loadData = createAction(types.LOAD_DATA);
export const loadDataSuccess = createAction(types.LOAD_DATA_SUCCESS);
export const loadDataError = createAction(types.LOAD_DATA_ERROR);

export const postComment = createAction(types.POST_COMMENT, data => data);
export const postCommentSuccess = createAction(types.POST_COMMENT_SUCCESS, data => data);
export const postCommentError = createAction(types.POST_COMMENT_ERROR, error => error);

export const deleteComment = createAction(types.DELETE_COMMENT, data => data);
export const deleteCommentSuccess = createAction(types.DELETE_COMMENT_SUCCESS);
export const deleteCommentError = createAction(types.DELETE_COMMENT_ERROR, error => error);

export const postLike = createAction(types.POST_LIKE, data => data);
export const postLikeSuccess = createAction(types.POST_LIKE_SUCCESS);
export const postLikeError = createAction(types.POST_LIKE_ERROR, error => error);

export const deleteLike = createAction(types.DELETE_LIKE, data => data);
export const deleteLikeSuccess = createAction(types.DELETE_LIKE_SUCCESS);
export const deleteLikeError = createAction(types.DELETE_LIKE_ERROR, error => error);
