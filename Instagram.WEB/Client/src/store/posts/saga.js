import { call, put, takeEvery, select } from 'redux-saga/effects';
import api from '../../api';
import types from './types';
import { push } from 'connected-react-router';
import {
    loadProfilePostsSuccess,
    loadProfilePostsError,
    postCommentSuccess,
    postCommentError,
    deleteCommentSuccess,
    deleteCommentError,
    likePostSuccess,
    likePostError,
    deleteLikeSuccess,
    deleteLikeError,
    loadPostDataSuccess,
    loadPostDataError
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
        const comments = state.posts.post.data.comments;

        yield put(postCommentSuccess([...comments, response.data.model]));
    } catch (e) {
        yield put(postCommentError(e));
    }
}

function* callDeleteComment({ payload }) {
    try {
        yield call(api.call.post, api.urls.posts.deleteComment_post, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });
        const state = yield select();
        const comments = state.posts.post.data.comments;
        const index = comments.indexOf(comments.find(c => c.id === payload));
        comments.splice(index, 1);

        yield put(deleteCommentSuccess([...comments]));
    } catch (e) {
        yield put(deleteCommentError(e));
    }
}

function* callLikePost({ payload }) {
    try {
        const response = yield call(api.call.post, api.urls.posts.likePost_post, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });
        const state = yield select();
        const likes = state.posts.post.data.likes;

        yield put(likePostSuccess([...likes, response.data.model]));

    } catch (e) {
        yield put(likePostError(e));
    }
}

function* callDeleteLike({ payload }) {
    try {
        yield call(api.call.post, api.urls.posts.deleteLike_post, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });
        const state = yield select();
        const currentUserName = state.user.data.userName;
        const likes = state.posts.post.data.likes;
        const index = likes.indexOf(likes.find(c => c.createdBy.userName === currentUserName));
        likes.splice(index, 1);
        yield put(deleteLikeSuccess([...likes]));
    } catch (e) {
        yield put(deleteLikeError(e));
    }
}

function* callLoadPostData({ payload }) {
    try {
        const response = yield call(api.call.get, `${api.urls.posts.loadPostData_get}?id=${payload}`);
        yield put(loadPostDataSuccess(response.data.model));
    } catch (e) {
        if (e.response.status === 404) {
            yield put(push('/notFound'));
        }
        yield put(loadPostDataError(e));
    }
}

export default [
    takeEvery(types.LOAD_PROFILE_POSTS, callLoadProfilePosts),
    takeEvery(types.POST_COMMENT, callPostComment),
    takeEvery(types.DELETE_COMMENT, callDeleteComment),
    takeEvery(types.LIKE_POST, callLikePost),
    takeEvery(types.DELETE_LIKE, callDeleteLike),
    takeEvery(types.LOAD_POST_DATA, callLoadPostData)
];
