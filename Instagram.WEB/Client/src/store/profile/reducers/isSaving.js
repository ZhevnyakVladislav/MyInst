import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => false;

export default handleActions({
    [combineActions(
        types.UPDATE_PROFILE_IMAGE,
        types.UPDATE_PROFILE,
    )]: () => true,
    [combineActions(
        types.UPDATE_PROFILE_IMAGE_SUCCESS,
        types.UPDATE_PROFILE_IMAGE_ERROR,
        types.UPDATE_PROFILE_SUCCESS,
        types.UPDATE_PROFILE_ERROR,
    )]: () => false,
}, createInitialState());