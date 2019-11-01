import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    id: -1,
    description: '',
    createdBy: {},
    createdAt: '',
    url: '',
    comments: [],
    likes: [],
});

export default handleActions({
    [types.LOAD_DATA_SUCCESS]: (state, { payload }) => ({ ...payload }),
    [combineActions(
        types.POST_COMMENT_SUCCESS,
        types.DELETE_COMMENT_SUCCESS
    )]: (state, { payload }) => ({
        ...state,
        comments: payload
    }),
    [combineActions(
        types.POST_LIKE_SUCCESS,
        types.DELETE_LIKE_SUCCESS
    )]: (state, { payload }) => ({
        ...state,
        likes: payload
    }),
    [combineActions(
        types.LOAD_DATA,
    )]: () => createInitialState()
}, createInitialState());