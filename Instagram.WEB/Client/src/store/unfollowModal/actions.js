import types from './types';
import { createAction } from 'redux-actions';

export const openModal = createAction(types.OPEN);
export const closeModal = createAction(types.CLOSE);
