import types from './types';
import { handleActions, combineActions } from 'redux-actions';
import getCookie from '../../helpers/cookie/index';

const userName = getCookie('userName');
const createInitialState = () => ({
    isUserAuth: !!userName,
    userName: getCookie('userName'),
    errorMessage: null,
    isAccountCorfimed: false,
    isPasswordReseted: false,
    isLoading: false
});

export default handleActions({
    [combineActions(
        types.USER_SIGN_IN,
        types.USER_SIGN_UP,
    )]: (state) => ({
        ...state,
        isLoading: true,
        isUserAuth: false
    }),
    [combineActions(
        types.USER_SIGN_UP_SUCCESS,
        types.CONFIRM_RESET_PASSWORD_SUCCESS
    )]: (state) => ({
        ...state,
        isLoading: false,
        isAccountCorfimed: true
    }),
    [combineActions(
        types.USER_SIGN_IN_SUCCESS,
        types.CONFIRM_EMAIL_SUCCESS
    )]: (state, actions) => ({
        ...state,
        ...actions.payload,
        isLoading: false,
        isUserAuth: true
    }),
    [combineActions(
        types.USER_SIGN_IN_ERROR,
        types.USER_SIGN_UP_ERROR,
        types.CONFIRM_EMAIL_ERROR,
        types.CONFIRM_RESET_PASSWORD_ERROR,
        types.RESET_PASSWORD_ERROR
    )]: (state, actions) => ({
        ...state,
        errorMessage: actions.payload.message,
        isLoading: false,
        isUserAuth: false,
    }),
    [combineActions(
        types.USER_UNAUTHORIZED,
        types.USER_LOGOUT_SUCCESS,
        types.RESET_PASSWORD_SUCCESS
    )]: () => ({
        ...createInitialState(),
        isUserAuth: false,
    }),
}, createInitialState());