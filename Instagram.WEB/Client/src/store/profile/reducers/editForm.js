import types from '../types';
import { handleActions, combineActions } from 'redux-actions';

const createInitialState = () => ({
    fullName: '',
    website: '',
    bio: '',
    email: '',
    phone: '',

});

export default handleActions({
    [combineActions(
        types.LOAD_EDIT_DATA,
    )]: (state) => ({ ...state }),
    [types.LOAD_EDIT_DATA_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, createInitialState());
