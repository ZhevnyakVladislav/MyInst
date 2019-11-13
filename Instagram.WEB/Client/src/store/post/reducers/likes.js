import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({});

export default handleActions({
    [combineActions(
        types.POST_LIKE_SUCCESS,
        types.DELETE_LIKE_SUCCESS
    )]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [types.LOAD_DETAIL_DATA_SUCCESS]: (_, { payload }) => ({ [payload.id]: payload.likes }),
    [types.LOAD_FOLLOWING_POSTS_SUCCESS]: (_, { payload }) => payload.posts.reduce((acc, p) => {
        acc[p.id] = p.likes;
        return acc;
    }, {})
}, createInitialState());