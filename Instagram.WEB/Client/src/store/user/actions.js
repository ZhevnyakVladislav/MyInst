import types from './types';
import { createAction } from 'redux-actions';

export const signIn = createAction(types.USER_SIGN_IN, data => data);
export const signInSuccess = createAction(types.USER_SIGN_IN_SUCCESS);
export const signInError = createAction(types.USER_SIGN_IN_ERROR, error => error);

export const signUp = createAction(types.USER_SIGN_UP, data => data);
export const signUpSuccess = createAction(types.USER_SIGN_UP_SUCCESS);
export const signUpError = createAction(types.USER_SIGN_UP_ERROR, error => error);

export const logOut = createAction(types.USER_LOGOUT);
export const logOutSuccess = createAction(types.USER_LOGOUT_SUCCESS);
export const logOutError = createAction(types.USER_LOGOUT_ERROR, error => error);

export const userUnauthorized = createAction(types.USER_UNAUTHORIZED);

export const confirmEmail = createAction(types.CONFIRM_EMAIL);
export const confirmEmailSuccess = createAction(types.CONFIRM_EMAIL_SUCCESS);
export const confirmEmailError = createAction(types.CONFIRM_EMAIL_ERROR, error => error);

export const confirmResetPassword = createAction(types.CONFIRM_RESET_PASSWORD);
export const confirmResetPasswordSuccess = createAction(types.CONFIRM_RESET_PASSWORD_SUCCESS);
export const confirmResetPasswordError = createAction(types.CONFIRM_RESET_PASSWORD_ERROR, error => error);