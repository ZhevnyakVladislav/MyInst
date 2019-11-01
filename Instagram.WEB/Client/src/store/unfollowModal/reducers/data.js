import types from '../types';
import { handleActions } from 'redux-actions';

const createInitialState = () => ({});

export default handleActions({
    [types.OPEN]: (state, { payload }) => ({ ...payload }),
    [types.CLOSE]: () => createInitialState()
}, createInitialState());

