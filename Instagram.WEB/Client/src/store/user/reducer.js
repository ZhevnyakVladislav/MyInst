import types from './types';
import { handleActions, combineActions } from 'redux-actions';
import { setAccessToken } from '../../utils/localStorage';

const createInitialState = () => ({
    isUserAuth: false,
    userName: '',
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
        types.USER_LOGOUT,
        types.RESET_PASSWORD_SUCCESS
    )]: () => {
        setAccessToken('');
        return {
            ...createInitialState(),
            isUserAuth: false,
        };
    }
}, createInitialState());