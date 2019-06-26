import types from './types';
import { handleActions, combineActions } from 'redux-actions';
import getCookie from '../../helpers/cookie/index';

const userName = getCookie('userName');
const createInitialState = () => ({
    isUserAuth: !!userName,
    userName: getCookie('userName'),
    errorMessage: null,
    isShowVerification: false
});

export default handleActions({
    [combineActions(
        types.USER_SIGN_IN,
        types.USER_SIGN_UP,
    )]: () => createInitialState(),
    [combineActions(
        types.CONFIRM_EMAIL,
        types.USER_SIGN_UP_SUCCESS
    )]: (state) => ({
        ...state,
        isShowVerification: true
    }),
    [combineActions(
        types.USER_SIGN_IN_SUCCESS,
        types.CONFIRM_EMAIL_SUCCESS
    )]: (state, actions) => ({
        ...state,
        ...actions.payload,
        isUserAuth: true
    }),
    [combineActions(
        types.USER_SIGN_IN_ERROR,
        types.USER_SIGN_UP_ERROR,
        types.CONFIRM_EMAIL_ERROR
    )]: (state, actions) => ({
        ...state,
        errorMessage: actions.payload.message,
        isUserAuth: false,
    }),
    [combineActions(
        types.USER_UNAUTHORIZED,
        types.USER_LOGOUT_SUCCESS,
    )]: () => ({
        ...createInitialState(),
        isUserAuth: false,
    }),
}, createInitialState());