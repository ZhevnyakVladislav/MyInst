import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    id: -1,
    description: '',
    createdBy: {},
    createdAt: '',
    url: '',
    comments: [],
    likes: [],
});

export default handleActions({
    [types.LOAD_DETAIL_DATA_SUCCESS]: (state, { payload }) => ({ ...payload }),
    [combineActions(
        types.LOAD_DETAIL_DATA,
    )]: () => createInitialState()
}, createInitialState());