import { combineReducers } from 'redux';

import profilePosts from './reducers/profilePosts';
// import postData from './reducers/postData';

export default combineReducers({
    // post: combineReducers({
    //     // data: postData,
    // }),
    profilePosts: profilePosts
});