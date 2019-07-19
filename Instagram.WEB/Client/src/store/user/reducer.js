import types from './types';
import { handleActions, combineActions } from 'redux-actions';
import { setAccessToken } from '../../utils/localStorage';

export const createInitialState = () => ({
    isUserAuth: false,
    userName: '',
    isAccountCorfimed: false,
    isPasswordReseted: false,
    isLoading: false,
    isSaving: false,
    isSubmittedSuccessfull: false,
});

export default handleActions({
    [types.CHANGE_PASSWORD]: (state) => ({
        ...state,
        isSaving: true,
        isSubmittedSuccessfull: false
    }),
    [types.CHANGE_PASSWORD_SUCCESS]: (state) => ({
        ...state,
        isSaving: false,
        isSubmittedSuccessfull: true,
    }),
    [types.CHANGE_PASSWORD_ERROR]: (state) => ({
        ...state,
        isSaving: false,
        isSubmittedSuccessfull: false,
    }),
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
    )]: (state, action) => ({
        ...state,
        ...action.payload,
        isLoading: false,
        isUserAuth: true
    }),
    [combineActions(
        types.USER_SIGN_IN_ERROR,
        types.USER_SIGN_UP_ERROR,
        types.CONFIRM_EMAIL_ERROR,
        types.CONFIRM_RESET_PASSWORD_ERROR,
        types.RESET_PASSWORD_ERROR
    )]: (state, action) => ({
        ...state,
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