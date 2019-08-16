import types from '../types';

import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => [];

export default handleActions({
    [types.LOAD_FOLLOWERS]: () => createInitialState(),
    [types.LOAD_FOLLOWERS_SUCCESS]: (state, action) => action.payload,
    [combineActions(
        types.FOLLOW_SUCCESS,
        types.UNFOLLOW_SUCCESS,
    )]: (state, action) => action.payload.followers
}, createInitialState());
