import { combineReducers } from 'redux';

import data from './reducers/data';
import isOpen from './reducers/isOpen';

export default combineReducers({
    isOpen,
    data,
});