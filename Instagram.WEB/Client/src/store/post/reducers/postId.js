import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = -1;

export default handleActions({
    [types.OPEN_DETAIL_MODAL]: (stata, { payload }) => payload,
    [types.CLOSE_DETAIL_MODAL]: () => initialState,
}, initialState);
