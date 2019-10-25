import { combineReducers } from 'redux';

import profilePosts from './reducers/profilePosts';
import postData from './reducers/postData';
import modalPostId from './reducers/modalPostId';
import isPostModalOpen from './reducers/isPostModalOpen';

export default combineReducers({
    postModal: combineReducers({
        isOpen: isPostModalOpen,
        id: modalPostId
    }),
    post: combineReducers({
        data: postData,
    }),
    profilePosts: profilePosts
});