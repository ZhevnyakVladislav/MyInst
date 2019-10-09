import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import modal from '../../common/components/modal/Modal';
import { connect } from 'react-redux';
import PostLayout from '../components/PostLayout';
import { closePostModal, postComment } from '../../store/posts/actions';

const PostModal = modal(PostLayout);

const PostModalContainer = ({
    postModal,
    comments,
    likes,
    onClosePostModal,
    onPostComment
}) => {

    const handleClosePostModal = useCallback(() => onClosePostModal(), []);

    return (
        <PostModal
            {...postModal}
            comments={comments}
            likes={likes}
            onClose={handleClosePostModal}
            onPostComment={onPostComment}
        />);
};

PostModalContainer.propTypes = {
    postModal: PropTypes.object,
    comments: PropTypes.array,
    likes: PropTypes.array,

    onClosePostModal: PropTypes.func,
    onPostComment: PropTypes.func
};

const mapStateToProps = state => ({
    postModal: state.posts.postModal,
    comments: state.posts.comments[state.posts.postModal.id],
    likes: state.posts.likes[state.posts.postModal.id],
});

const mapDispatchToProps = ({
    onClosePostModal: closePostModal,
    onPostComment: postComment
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModalContainer);