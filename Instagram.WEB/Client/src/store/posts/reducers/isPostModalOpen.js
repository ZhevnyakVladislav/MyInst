import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [types.OPEN_POST_MODAL]: () => true,
    [types.CLOSE_POST_MODAL]: () => initialState
}, initialState);