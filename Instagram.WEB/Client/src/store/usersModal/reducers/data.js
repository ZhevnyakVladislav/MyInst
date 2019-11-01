import types from '../types';
import profileTypes from '../../profile/types';
import { handleActions, combineActions } from 'redux-actions';

const initialState = [];

export default handleActions({
    [combineActions(
        types.LOAD_DATA_SUCCESS,
    )]: (state, { payload }) => [...payload],
    [combineActions(
        profileTypes.UNFOLLOW_SUCCESS,
        profileTypes.FOLLOW_SUCCESS
    )]: (state, { payload }) => [...payload.data],
    [combineActions(
        types.OPEN,
        types.CLOSE
    )]: () => initialState,
}, initialState);
