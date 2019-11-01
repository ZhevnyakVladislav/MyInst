import types from '../types';

import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    userName: ''
});

export default handleActions({
    [types.SIGN_UP]: (state, action) => ({
        userName: action.payload.userName
    }),
    [combineActions(
        types.SIGN_IN_SUCCESS,
        types.CONFIRM_CODE_SUCCESS
    )]: (state, action) => action.payload,
    [combineActions(
        types.UNAUTHORIZED,
        types.LOGOUT,
        types.RESET_PASSWORD_SUCCESS
    )]: () => createInitialState(),
}, createInitialState());