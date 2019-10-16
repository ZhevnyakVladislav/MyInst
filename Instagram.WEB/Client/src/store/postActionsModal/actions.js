import types from './types';
import { createAction } from 'redux-actions';

export const openModal = createAction(types.OPEN_MODAL, data => data);
export const closeModal = createAction(types.CLOSE_MODAL);
