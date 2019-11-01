import types from './types';
import { handleActions } from 'redux-actions';

const createInitialState = () => ({
    isShow: false
});

export default handleActions({
    [types.SHOW]: (state, action) => ({
        ...state,
        message: action.payload,
        isShow: true
    }),
    [types.HIDE]: (state) => ({
        ...state,
        isShow: false
    }),
}, createInitialState());