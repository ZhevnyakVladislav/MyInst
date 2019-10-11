import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import modal from '../../common/components/modal/Modal';
import { connect } from 'react-redux';
import PostLayout from '../components/PostLayout';
import {
    closePostModal,
    postComment,
    likePost,
    deleteLike
} from '../../store/posts/actions';

const PostModal = modal(PostLayout);

const PostModalContainer = ({
    postModal,
    comments,
    likes,
    currentUserName,
    onClosePostModal,
    onPostComment,
    onLikePost,
    onDeleteLike
}) => {

    const handleClosePostModal = useCallback(() => onClosePostModal(), []);

    return (
        <PostModal
            {...postModal}
            comments={comments}
            likes={likes}
            currentUserName={currentUserName}
            onClose={handleClosePostModal}
            onPostComment={onPostComment}
            onLikePost={onLikePost}
            onDeleteLike={onDeleteLike}
        />);
};

PostModalContainer.propTypes = {
    postModal: PropTypes.object,
    comments: PropTypes.array,
    likes: PropTypes.array,
    currentUserName: PropTypes.string,

    onClosePostModal: PropTypes.func,
    onPostComment: PropTypes.func,
    onLikePost: PropTypes.func,
    onDeleteLike: PropTypes.func
};

const mapStateToProps = state => ({
    postModal: state.posts.postModal,
    comments: state.posts.comments[state.posts.postModal.id],
    likes: state.posts.likes[state.posts.postModal.id],
    currentUserName: state.user.data.userName
});

const mapDispatchToProps = ({
    onClosePostModal: closePostModal,
    onPostComment: postComment,
    onLikePost: likePost,
    onDeleteLike: deleteLike
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModalContainer);