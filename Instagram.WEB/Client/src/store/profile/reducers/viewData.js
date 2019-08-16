import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

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
    [types.LOAD_VIEW_PROFILE_DATA]: (state) => ({ ...state }),
    [types.LOAD_VIEW_PROFILE_DATA_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [combineActions(
        types.FOLLOW_SUCCESS,
        types.UNFOLLOW_SUCCESS
    )]: (state, action) => ({
        ...state,
        ...action.payload.viewData
    })
}, createInitialState());