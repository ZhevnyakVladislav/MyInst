import types from './types';
import { handleActions } from 'redux-actions';

const createInitialState = () => ({
    image: '',
    userName: '',
    fullName: '',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
});
export default handleActions({
    [types.LOAD_PROFILE_DATA]: () => createInitialState(),
    [types.LOAD_PROFILE_DATA_SUCCESS]: (state, actions) => ({
        ...state,
        ...actions.payload
    }),
    [types.LOAD_PROFILE_DATA_ERROR]: (state) => ({
        ...state
    })
}, createInitialState());