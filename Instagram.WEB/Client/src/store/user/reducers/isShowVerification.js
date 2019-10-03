import types from '../types';

import { handleActions, combineActions } from 'redux-actions';

const initialState = false;

export default handleActions({
    [combineActions(
        types.USER_SIGN_UP_SUCCESS,
        types.CONFIRM_RESET_PASSWORD_SUCCESS
    )]: () => true,
    [combineActions(
        types.CONFIRM_CODE_SUCCESS,
    )]: () => false
}, initialState);

