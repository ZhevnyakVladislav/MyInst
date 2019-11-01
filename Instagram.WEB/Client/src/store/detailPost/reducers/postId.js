import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = -1;

export default handleActions({
    [types.OPEN_MODAL]: (stata, { payload }) => payload,
    [types.CLOSE_MODAL]: () => initialState,
}, initialState);
