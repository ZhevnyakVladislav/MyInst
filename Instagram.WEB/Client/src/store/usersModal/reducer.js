import { combineReducers } from 'redux';

import isOpen from './reducers/isOpen';
import modalType from './reducers/modalType';
import userName from './reducers/userName';
import data from './reducers/data';
import isLoading from './reducers/isLoading';

export default combineReducers({
    isOpen,
    modalType,
    userName,
    data,
    isLoading
});