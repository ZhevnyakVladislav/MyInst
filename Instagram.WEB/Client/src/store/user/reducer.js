import types from './types';
import { handleActions } from 'redux-actions';

const initialState = () => ({
    isUserAuth: false,
    id: null,
    errorMessage: null,
    userName: '',

});

export default handleActions({
    [types.USER_SIGN_UP]: () => initialState(),
    [types.USER_SIGN_UP_SUCCESS]: (state, actions) => ({
        ...state,
        ...actions.payload,
        isUserAuth: true
    }),
    [types.USER_SIGN_UP_ERROR]: (state, actions) => ({
        ...state,
        errorMessage: actions.payload.message,
        isUserAuth: false
    }),
}, initialState());