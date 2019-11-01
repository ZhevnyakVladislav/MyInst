import types from './types';
import { createAction } from 'redux-actions';

export const openModal = createAction(types.OPEN);
export const closeModal = createAction(types.CLOSE);

export const loadData = createAction(types.LOAD_DATA);
export const loadDataSuccess = createAction(types.LOAD_DATA_SUCCESS);
export const loadDataError = createAction(types.LOAD_DATA_ERROR);