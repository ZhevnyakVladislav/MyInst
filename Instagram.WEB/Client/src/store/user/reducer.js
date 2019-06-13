import types from './types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    isUserAuth: true,
    id: null,
    errorMessage: null,
    userName: '',
});

export default handleActions({
    [combineActions(
        types.USER_SIGN_IN,
        types.USER_SIGN_UP,
        types.LOAD_USER_DATA
    )]: () => createInitialState(),

    [combineActions(
        types.USER_SIGN_IN_SUCCESS,
        types.USER_SIGN_UP_SUCCESS,
        types.LOAD_USER_DATA_SUCCESS
    )]: (state, actions) => ({
        ...state,
        ...actions.payload,
        isUserAuth: true
    }),
    [combineActions(
        types.USER_SIGN_IN_ERROR,
        types.USER_SIGN_UP_ERROR,
        types.LOAD_USER_DATA_ERROR
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