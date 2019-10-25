import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import modal from '../modal/Modal';
import CommentActionsMenu from './CommentActionsMenu';
import { deleteComment } from '../../store/posts/actions';

const contentStyles = {
    width: '40%'
};

const CommentActionsModal = modal(CommentActionsMenu, contentStyles);

const CommentyActionsModalContainder = ({
    isOpen,
    commentId,
    onClose,
    onDeleteComment
}) => {

    const deleteComment = useCallback(
        () => {
            onDeleteComment(commentId);
            onClose();
        },
        [commentId, onClose, onDeleteComment]
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