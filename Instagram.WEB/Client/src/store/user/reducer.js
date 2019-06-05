import types from './types';
import { handleActions } from 'redux-actions';

const initialState = () => ({
    isUserAuth: true,
    errorMessage: null
});

export default handleActions({
    [types.USER_SIGN_UP]: () => initialState(),
    [types.USER_SIGN_UP_SUCCESS]: (state) => ({ ...state, isUserAuth: true }),
    [types.USER_SIGN_UP_ERROR]: (state, actions) => ({
        ...state,
        errorMessage: actions.payload.message,
        isUserAuth: false
    }),
}, initialState());