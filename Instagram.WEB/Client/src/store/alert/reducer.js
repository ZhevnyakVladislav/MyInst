import types from './types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    isShow: false
});

export default handleActions({
    [types.SHOW_ALERT]: (state, action) => ({
        ...state,
        message: action.payload,
        isShow: true
    }),
    [types.HIDE_ALERT]: (state) => ({
        ...state,
        isShow: false
    }),
}, createInitialState());