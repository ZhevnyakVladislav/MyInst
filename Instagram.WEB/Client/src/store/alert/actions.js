import types from './types';
import { createAction } from 'redux-actions';

export const showAlert = createAction(types.SHOW_ALERT);
export const hideAlert = createAction(types.HIDE_ALERT);
