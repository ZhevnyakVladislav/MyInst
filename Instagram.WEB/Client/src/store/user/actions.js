import types from './types';
import { createAction } from 'redux-actions';

const signIn = (data) => createAction(types.USER_SIGN_IN, data);
const signUp = (data) => ({
    type: types.USER_SIGN_UP,
    payload: data
});

export default {
    signIn: signIn,
    signUp: signUp
};