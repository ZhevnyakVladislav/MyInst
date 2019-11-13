import types from '../types';
import { handleActions, combineActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

const createInitialState = () => ({
    userName: '',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    imageUrl: '',
    isPrivate: true,
    isFollowing: false,
});

export default handleActions({
    [combineActions(
        LOCATION_CHANGE,
        types.LOAD_VIEW_DATA
    )]: () => createInitialState(),
    [types.LOAD_VIEW_DATA_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [combineActions(
        types.FOLLOW_SUCCESS,
        types.UNFOLLOW_SUCCESS
    )]: (state, { payload }) => ({
        ...state,
        ...payload.viewData
    })
}, createInitialState());