import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => [];

export default handleActions({
    [types.LOAD_PROFILE_POSTS_SUCCESS]: (state, { payload }) => payload.reduce((acc, p) => {
        acc[p.id] = p.likes;
        return acc;
    }, {}) || {},
    [combineActions(
        types.LIKE_POST_SUCCESS,
        types.DELETE_LIKE_SUCCESS
    )]: (state, { payload }) => ({ ...payload })
}, createInitialState());