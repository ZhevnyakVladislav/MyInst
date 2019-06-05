import types from './types';
import { createAction } from 'redux-actions';

export const signIn = createAction(types.USER_SIGN_IN, data => data);
export const signUp = createAction(types.USER_SIGN_UP, data => data);
export const signUpSuccess = createAction(types.USER_SIGN_UP_SUCCESS);
export const signUpError = createAction(types.USER_SIGN_UP_ERROR, error => error);