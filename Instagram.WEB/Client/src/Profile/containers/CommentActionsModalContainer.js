import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import modal from '../../common/components/modal/Modal';
import CommentActionsMenu from '../components/CommentActionsMenu';
import { deleteComment } from '../../store/posts/actions';

const CommentActionsModal = modal(CommentActionsMenu);

const CommentyActionsModalContainder = ({
    isOpen,
    commentId,
    postId,
    onClose,
    onDeleteComment
}) => {

    const deleteComment = useCallback(
        () => {
            onDeleteComment({
                commentId,
                postId
            });
            onClose();
        },
        [commentId, postId, onClose]
    );

    return (
        <CommentActionsModal
            isOpen={isOpen}
            onClose={onClose}
            onDeleteComment={deleteComment}
        />
    );
};

CommentyActionsModalContainder.propTypes = {
    isOpen: PropTypes.bool,
    commentId: PropTypes.number,
    postId: PropTypes.number,

    onClose: PropTypes.func,
    onDeleteComment: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
    onDeleteComment: deleteComment
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentyActionsModalContainder);