import types from '../types';
import { handleActions } from 'redux-actions';

const createInitialState = () => ({
    postId: -1,
    createdBy: {
        userName: '',
        imageUrl: ''
    }
});

export default handleActions({
    [types.OPEN]: (state, { payload }) => ({
        ...payload
    }),
    [types.CLOSE]: () => createInitialState()
}, createInitialState());