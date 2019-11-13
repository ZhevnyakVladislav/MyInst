import { combineReducers } from 'redux';

import comments from './reducers/comments';
import detailPost from './reducers/detailPost';
import isDetailPostModalOpen from './reducers/isDetailPostModalOpen';
import isLoading from './reducers/isLoading';
import likes from './reducers/likes';
import postId from './reducers/postId';
import posts from './reducers/posts';
import hasMore from './reducers/hasMore';

export default combineReducers({
    comments,
    detailPost,
    isDetailPostModalOpen,
    isLoading,
    likes,
    postId,
    posts,
    hasMore
});