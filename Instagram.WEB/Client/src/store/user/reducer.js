import types from './types';
import { handleActions } from 'redux-actions';

const initialState = () => ({
    isUserAuth: true
});

export default handleActions({
    [types.USER_SIGN_UP]: () => initialState(),
    [types.USER_SIGN_UP_SUCCESS]: (state) => ({ ...state, isUserAuth: true }),
    [types.USER_SIGN_UP_ERROR]: (state) => ({ ...state, isUserAuth: false }),
}, initialState());