import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [types.OPEN_MODAL]: () => true,
    [types.CLOSE_MODAL]: () => false
}, initialState);