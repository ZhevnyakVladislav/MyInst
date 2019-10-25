import types from '../types';

import { handleActions, combineActions } from 'redux-actions';
import { setAccessToken } from '../../../utils/localStorage';

const initialState = false;

export default handleActions({
    [combineActions(
        types.USER_SIGN_IN,
        types.USER_SIGN_IN_ERROR,
        types.USER_SIGN_UP,
        types.USER_SIGN_UP_ERROR,
        types.CONFIRM_CODE,
        types.CONFIRM_CODE_ERROR,
    )]: () => false,
    [combineActions(
        types.USER_SIGN_IN_SUCCESS,
        types.CONFIRM_CODE_SUCCESS
    )]: () => true,
    [combineActions(
        types.USER_UNAUTHORIZED,
        types.USER_LOGOUT,
        types.RESET_PASSWORD_SUCCESS
    )]: () => {
        setAccessToken('');
        return false;
    }
}, initialState);
