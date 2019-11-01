import { combineReducers } from 'redux';

import isBusy from './reducers/isBusy';
import isUserAuth from './reducers/isUserAuth';
import isShowVerification from './reducers/isShowVerification';
import data from './reducers/data';

export default combineReducers({
    isBusy,
    isUserAuth,
    isShowVerification,
    data
});