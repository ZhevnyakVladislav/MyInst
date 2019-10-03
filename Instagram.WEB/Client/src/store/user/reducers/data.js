import types from '../types';

import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    userName: ''
});

export default handleActions({
    [types.USER_SIGN_UP]: (state, action) => ({
        userName: action.payload.userName
    }),
    [combineActions(
        types.USER_SIGN_IN_SUCCESS,
        types.CONFIRM_CODE_SUCCESS
    )]: (state, action) => action.payload,
    [combineActions(
        types.USER_UNAUTHORIZED,
        types.USER_LOGOUT,
        types.RESET_PASSWORD_SUCCESS
    )]: () => createInitialState(),
}, createInitialState());