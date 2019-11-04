
import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = '';

export default handleActions({
    [types.OPEN]: (state, { payload }) => payload.userName || payload.postId,
    [types.CLOSE]: () => initialState,
}, initialState);
