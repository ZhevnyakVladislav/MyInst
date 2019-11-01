import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [types.LOAD_DATA]: () => true,
    [combineActions(
        types.LOAD_DATA_SUCCESS,
        types.LOAD_DATA_ERROR
    )]: () => initialState
}, initialState);
