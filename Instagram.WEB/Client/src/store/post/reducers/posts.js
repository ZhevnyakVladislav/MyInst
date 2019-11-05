import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const initialState = [];

export default handleActions({
    [combineActions(
        types.LOAD_FOLLOWING_POSTS_SUCCESS,
        types.LOAD_PROFILE_POSTS_SUCCESS
    )]: () => initialState,
    [combineActions(
        types.LOAD_FOLLOWING_POSTS_SUCCESS,
        types.LOAD_PROFILE_POSTS_SUCCESS
    )]: (state, { payload }) => [...payload],
}, initialState);