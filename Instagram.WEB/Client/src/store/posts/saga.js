import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../api';
import types from './types';
import {
    loadProfilePostsSuccess,
    loadProfilePostsError,
} from './actions';

function* callLoadProfilePosts({ payload }) {
    try {
        const response = yield call(api.call.get, `${api.urls.posts.loadProfilePosts_get}?userName=${payload}`);
        yield put(loadProfilePostsSuccess(response.data.model));
    } catch (e) {
        yield put(loadProfilePostsError(e));
    }
}

export default [
    takeEvery(types.LOAD_PROFILE_POSTS, callLoadProfilePosts),
];
