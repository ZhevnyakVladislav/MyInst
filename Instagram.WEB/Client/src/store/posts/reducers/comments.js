import types from '../types';
import { handleActions } from 'redux-actions';

const createInitialState = () => [];

export default handleActions({
    [types.LOAD_PROFILE_POSTS_SUCCESS]: (state, { payload }) => payload.reduce((acc, p) => {
        acc[p.id] = p.comments;
        return acc;
    }, {}) || {},
    [types.POST_COMMENT_SUCCESS]: (state, { payload }) => ({ ...payload })
}, createInitialState());