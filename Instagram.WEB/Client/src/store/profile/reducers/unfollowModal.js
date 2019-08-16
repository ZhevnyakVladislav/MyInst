import types from '../types';

import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    isOpen: false,
    profileData: {}
});


export default handleActions({
    [types.OPEN_UNFOLLOW_MODAL]: (state, action) => ({
        isOpen: true,
        profileData: action.payload
    }),
    [combineActions(
        types.CLOSE_UNFOLLOW_MODAL,
        types.FOLLOW,
        types.UNFOLLOW
        // types.CHANGE_FOLLOWING_SUCCESS
    )]: () => createInitialState()
}, createInitialState());