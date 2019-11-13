import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [combineActions(
        types.LOAD_VIEW_DATA,
        types.LOAD_VIEW_DATA_ERROR
    )]: () => false,
    [combineActions(
        types.LOAD_VIEW_DATA_SUCCESS,
    )]: () => true,
}, initialState);