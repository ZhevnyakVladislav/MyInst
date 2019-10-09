import { combineReducers } from 'redux';

import profilePosts from './reducers/profilePosts';
import postModal from './reducers/postModal';
import comments from './reducers/comments';
import likes from './reducers/likes';

export default combineReducers({
    profilePosts,
    postModal,
    comments,
    likes
});