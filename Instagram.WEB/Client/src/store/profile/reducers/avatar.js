import types from '../types';

import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    imageUrl: ''
});

export default handleActions({
    [combineActions(
        types.LOAD_PROFILE_AVATAR,
        types.UPDATE_PROFILE_IMAGE
    )]: (state) => ({ ...state }),
    [types.LOAD_PROFILE_AVATAR_SUCCESS]: (state, action) => ({
        ...state,
        imageUrl: action.payload,
    }),
    [types.UPDATE_PROFILE_IMAGE_SUCCESS]: (state, action) => ({
        state,
        imageUrl: action.payload
    })
}, createInitialState());