import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [types.OPEN_DETAIL_MODAL]: () => true,
    [types.CLOSE_DETAIL_MODAL]: () => initialState,
}, initialState);
