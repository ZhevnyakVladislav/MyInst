import types from '../types';

import { handleActions, combineActions } from 'redux-actions';
import { setAccessToken } from '../../../utils/localStorage';

const initialState = false;

export default handleActions({
    [combineActions(
        types.SIGN_IN,
        types.SIGN_IN_ERROR,
        types.SIGN_UP,
        types.SIGN_UP_ERROR,
        types.CONFIRM_CODE,
        types.CONFIRM_CODE_ERROR,
    )]: () => false,
    [combineActions(
        types.SIGN_IN_SUCCESS,
        types.CONFIRM_CODE_SUCCESS
    )]: () => true,
    [combineActions(
        types.UNAUTHORIZED,
        types.LOGOUT,
        types.RESET_PASSWORD_SUCCESS
    )]: () => {
        setAccessToken('');
        return false;
    }
}, initialState);
