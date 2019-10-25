import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = -1;

export default handleActions({
    [types.OPEN_POST_MODAL]: (state, { payload }) => payload,
    [types.CLOSE_POST_MODAL]: () => initialState
}, initialState);