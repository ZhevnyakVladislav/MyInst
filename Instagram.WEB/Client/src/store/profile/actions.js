import types from './types';
import { createAction } from 'redux-actions';

export const loadProfileData = createAction(types.LOAD_PROFILE_DATA);
export const loadProfileDataSuccess = createAction(types.LOAD_PROFILE_DATA_SUCCESS);
export const loadProfileDataError = createAction(types.LOAD_PROFILE_DATA_ERROR);
