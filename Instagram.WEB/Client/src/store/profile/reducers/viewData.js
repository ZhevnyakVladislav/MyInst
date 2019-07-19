import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    imageUrl: '',
    isPrivate: true,
    isFollowing: false,
});

export default handleActions({
    [combineActions(
        types.LOAD_VIEW_PROFILE_DATA,
    )]: (state) => ({ ...state }),
    [types.LOAD_VIEW_PROFILE_DATA_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [types.CHANGE_FOLLOWING_SUCCESS]: (state) => ({
        ...state,
        isFollowing: !state.isFollowing,
        followersCount: state.isFollowing ? state.followersCount - 1 : state.followersCount + 1
    })
}, createInitialState());