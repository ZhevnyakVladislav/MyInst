import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import api from '../../api';
import types from './types';
import { push } from 'connected-react-router';
import {
    loadDataSuccess,
    loadDataError,
    postCommentSuccess,
    postCommentError,
    deleteCommentSuccess,
    deleteCommentError,
    postLikeSuccess,
    postLikeError,
    deleteLikeSuccess,
    deleteLikeError
} from './actions';

function* callLoadData({ payload }) {
    try {
        const response = yield call(api.call.get, `${api.urls.posts.loadPostData_get}?id=${payload}`);
        yield put(loadDataSuccess(response.data.model));
    } catch (e) {
        if (e.response.status === 404) {
            yield put(push('/notFound'));
        }
        yield put(loadDataError(e));
    }
}

function* callPostComment({ payload }) {
    try {
        const response = yield call(api.call.post, api.urls.posts.postComment_post, payload);
        const state = yield select();
        const comments = state.detailPost.data.comments;

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
        const comments = state.detailPost.data.comments;
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
        const likes = state.detailPost.data.likes;

        yield put(postLikeSuccess([...likes, response.data.model]));

    } catch (e) {
        yield put(postLikeError(e));
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
        const likes = state.detailPost.data.likes;
        const index = likes.indexOf(likes.find(c => c.createdBy.userName === currentUserName));
        likes.splice(index, 1);
        yield put(deleteLikeSuccess([...likes]));
    } catch (e) {
        yield put(deleteLikeError(e));
    }
}

export default function* saga() {
    yield all([
        takeEvery(types.LOAD_DATA, callLoadData),
        takeEvery(types.POST_COMMENT, callPostComment),
        takeEvery(types.DELETE_COMMENT, callDeleteComment),
        takeEvery(types.POST_LIKE, callLikePost),
        takeEvery(types.DELETE_LIKE, callDeleteLike),
    ]);
}