import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [combineActions(
        types.LOAD_DETAIL_DATA,
        types.LOAD_FOLLOWING_POSTS,
        types.LOAD_PROFILE_POSTS
    )]: () => true,
    [combineActions(
        types.LOAD_DETAIL_DATA_SUCCESS,
        types.LOAD_DETAIL_DATA_ERROR,
        types.LOAD_FOLLOWING_POSTS_SUCCESS,
        types.LOAD_FOLLOWING_POSTS_ERROR,
        types.LOAD_PROFILE_POSTS_SUCCESS,
        types.LOAD_PROFILE_POSTS_ERROR
    )]: () => initialState
}, initialState);
