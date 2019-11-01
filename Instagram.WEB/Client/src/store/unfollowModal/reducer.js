import { combineReducers } from 'redux';

import isOpen from './reducers/isOpen';
import data from './reducers/data';

export default combineReducers({
    isOpen,
    data
});