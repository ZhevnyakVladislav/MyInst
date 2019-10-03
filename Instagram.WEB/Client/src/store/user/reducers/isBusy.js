import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [combineActions(
        types.USER_SIGN_IN,
        types.USER_SIGN_UP,
        types.CONFIRM_CODE,
        types.CONFIRM_RESET_PASSWORD
    )]: () => true,
    [combineActions(
        types.USER_SIGN_IN_SUCCESS,
        types.USER_SIGN_IN_ERROR,
        types.USER_SIGN_UP_SUCCESS,
        types.USER_SIGN_UP_ERROR,
        types.CONFIRM_CODE_SUCCESS,
        types.CONFIRM_CODE_ERROR,
        types.CONFIRM_RESET_PASSWORD_SUCCESS,
        types.CONFIRM_RESET_PASSWORD_ERROR
    )]: () => false
}, initialState);