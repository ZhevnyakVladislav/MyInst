import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => [];

export default handleActions({
    [types.LOAD_PROFILE_POSTS_SUCCESS]: (state, { payload }) => payload.reduce((acc, p) => {
        acc[p.id] = p.comments;
        return acc;
    }, {}) || {},
    [combineActions(
        types.POST_COMMENT_SUCCESS,
        types.DELETE_COMMENT_SUCCESS
    )]: (state, { payload }) => ({ ...payload })
}, createInitialState());