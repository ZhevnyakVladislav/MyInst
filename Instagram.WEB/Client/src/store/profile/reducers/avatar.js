import types from '../types';

import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    imageUrl: ''
});

export default handleActions({
    [combineActions(
        types.LOAD_AVATAR,
        types.UPDATE_IMAGE
    )]: (state) => ({ ...state }),
    [types.LOAD_AVATAR_SUCCESS]: (state, action) => ({
        ...state,
        imageUrl: action.payload,
    }),
    [types.UPDATE_IMAGE_SUCCESS]: (state, action) => ({
        state,
        imageUrl: action.payload
    })
}, createInitialState());