
import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = 0;

export default handleActions({
    [types.OPEN]: (state, { payload }) => payload.modalType,
    [types.CLOSE]: () => initialState,
}, initialState);
