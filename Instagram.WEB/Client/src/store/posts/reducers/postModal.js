import types from '../types';
import { handleActions } from 'redux-actions';

const createInitialState = () => ({
    id: -1,
    isOpen: false,
    description: '',
    createdBy: {},
    createdAt: '',
    comments: [],
    likes: [],
});

export default handleActions({
    [types.OPEN_POST_MODAL]: (state, { payload }) => ({
        ...payload,
        isOpen: true,
    }),
    [types.CLOSE_POST_MODAL]: () => createInitialState()
}, createInitialState());