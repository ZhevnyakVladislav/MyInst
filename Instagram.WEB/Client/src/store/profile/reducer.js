import types from './types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    image: '',
    userName: '',
    fullName: '',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    website: '',
    bio: '',
    email: '',
    phone: '',
    error: null,
    imageUrl: '',
    isLoading: false,
    isSaving: false
});
export default handleActions({
    [combineActions(
        types.LOAD_EDIT_PROFILE_DATA,
        types.LOAD_VIEW_PROFILE_DATA,
    )]: (state) => ({
        ...state,
        isLoading: true
    }),
    [combineActions(
        types.UPDATE_PROFILE_IMAGE,
        types.UPDATE_PROFILE
    )]: (state) => ({
        ...state,
        isSaving: true
    }),
    [combineActions(
        types.LOAD_VIEW_PROFILE_DATA_SUCCESS,
        types.LOAD_EDIT_PROFILE_DATA_SUCCESS,
        // types.UPDATE_PROFILE_SUCCESS
    )]: (state, action) => ({
        ...state,
        ...action.payload,
        isLoading: false
    }),
    [types.UPDATE_PROFILE_IMAGE_SUCCESS]: (state, action) => ({
        ...state,
        imageUrl: action.payload,
        isSaving: false
    }),
    [types.UPDATE_PROFILE_SUCCESS]: (state) => ({
        ...state,
        isSaving: false
    }),
    [combineActions(
        types.LOAD_VIEW_PROFILE_DATA,
        types.LOAD_EDIT_PROFILE_DATA,
        types.UPDATE_PROFILE_IMAGE_ERROR,
        types.UPDATE_PROFILE_ERROR
    )]: (state, action) => ({
        ...state,
        error: action.payload.message,
        isLoading: false,
        isSaving: false
    })
}, createInitialState());