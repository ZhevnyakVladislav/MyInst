import { combineReducers } from 'redux';

import isModalOpen from './reducers/isModalOpen';
import data from './reducers/data';
import postId from './reducers/postId';
import isLoading from './reducers/isLoading';

export default combineReducers({
    isModalOpen,
    data,
    postId,
    isLoading
});