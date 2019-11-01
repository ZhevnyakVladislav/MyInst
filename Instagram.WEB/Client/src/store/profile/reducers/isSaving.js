import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => false;

export default handleActions({
    [combineActions(
        types.UPDATE_IMAGE,
        types.UPDATE,
    )]: () => true,
    [combineActions(
        types.UPDATE_IMAGE_SUCCESS,
        types.UPDATE_IMAGE_ERROR,
        types.UPDATE_SUCCESS,
        types.UPDATE_ERROR,
    )]: () => false,
}, createInitialState());