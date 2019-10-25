import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailPost from '../components/DetailPost';
import {
    postComment,
    likePost,
    deleteLike,
    loadPostData
} from '../../../store/posts/actions';
import { openModal } from '../../../store/postActionsModal/actions';
import PostActionModalContainer from './PostActionModalContainer';

const PostModalContainer = ({
    id,
    postModalData,
    postData,
    // comments,
    // likes,
    currentUserName,
    loadPostData,
    onPostComment,
    onLikePost,
    onDeleteLike,
    openPostActionMenu
}) => {

    const postId = id || postModalData.id;

    useEffect(
        () => {
            loadPostData(postId);
        },
        []
    );

    return (
        <>
            <DetailPost
                {...postData}
                // comments={comments}
                // likes={likes}
                currentUserName={currentUserName}
                onPostComment={onPostComment}
                onLikePost={onLikePost}
                onDeleteLike={onDeleteLike}
                openPostActionMenu={openPostActionMenu}
            />
            <PostActionModalContainer />
        </>
    );
};

PostModalContainer.propTypes = {
    id: PropTypes.number,
    postModalData: PropTypes.object,
    postData: PropTypes.object,
    comments: PropTypes.array,
    likes: PropTypes.array,
    currentUserName: PropTypes.string,

    loadPostData: PropTypes.func,
    onPostComment: PropTypes.func,
    onLikePost: PropTypes.func,
    onDeleteLike: PropTypes.func,
    openPostActionMenu: PropTypes.func
};

const mapStateToProps = state => ({
    postModalData: state.posts.postModal,
    postData: state.posts.post.data,
    // comments: state.posts.comments[state.posts.postModalData.id],
    // likes: state.posts.likes[state.posts.postModalData.id],
    currentUserName: state.user.data.userName
});

const mapDispatchToProps = ({
    loadPostData: loadPostData,
    onPostComment: postComment,
    onLikePost: likePost,
    onDeleteLike: deleteLike,
    openPostActionMenu: openModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModalContainer);