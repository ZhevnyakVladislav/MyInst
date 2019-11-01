import types from '../types';
import { handleActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [types.OPEN]: () => true,
    [types.CLOSE]: () => false
}, initialState);