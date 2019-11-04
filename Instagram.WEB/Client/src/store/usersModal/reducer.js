import { combineReducers } from 'redux';

import isOpen from './reducers/isOpen';
import modalType from './reducers/modalType';
import param from './reducers/param';
import data from './reducers/data';
import isLoading from './reducers/isLoading';

export default combineReducers({
    isOpen,
    modalType,
    param,
    data,
    isLoading
});