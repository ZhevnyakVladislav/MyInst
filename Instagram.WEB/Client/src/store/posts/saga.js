import { call, put, takeEvery, select } from 'redux-saga/effects';
import api from '../../api';
import types from './types';
import {
    loadProfilePostsSuccess,
    loadProfilePostsError,
    postCommentSuccess,
    postCommentError,
    deleteCommentSuccess,
    deleteCommentError
} from './actions';

function* callLoadProfilePosts({ payload }) {
    try {
        const response = yield call(api.call.get, `${api.urls.posts.loadProfilePosts_get}?userName=${payload}`);
        yield put(loadProfilePostsSuccess(response.data.model));
    } catch (e) {
        yield put(loadProfilePostsError(e));
    }
}

function* callPostComment({ payload }) {
    try {
        const response = yield call(api.call.post, api.urls.posts.postComment_post, payload);
        const state = yield select();
        const comments = state.posts.comments;

        comments[payload.postId] = [
            ...comments[payload.postId],
            response.data.model
        ];

        yield put(postCommentSuccess(comments));
    } catch (e) {
        yield put(postCommentError(e));
    }
}

function* callDeleteComment({ payload }) {
    try {
        yield call(api.call.post, api.urls.posts.deleteComment_post, JSON.stringify(payload.commentId), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });
        const state = yield select();
        const comments = state.posts.comments;
        const postComment = comments[payload.postId];
        const index = postComment.indexOf(postComment.find(c => c.id === payload.commentId));

        postComment.splice(index, 1);
        comments[payload.postId] = [...postComment];

        yield put(deleteCommentSuccess(comments));
    } catch (e) {
        yield put(deleteCommentError(e));
    }
}

export default [
    takeEvery(types.LOAD_PROFILE_POSTS, callLoadProfilePosts),
    takeEvery(types.POST_COMMENT, callPostComment),
    takeEvery(types.DELETE_COMMENT, callDeleteComment)
];
