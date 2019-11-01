import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => false;

export default handleActions({
    [combineActions(
        types.LOAD_VIEW_DATA,
    )]: () => true,
    [combineActions(
        types.LOAD_VIEW_DATA_SUCCESS,
        types.LOAD_VIEW_DATA_ERROR,
    )]: () => false,
}, createInitialState());