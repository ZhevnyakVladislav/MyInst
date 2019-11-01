import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import modal from '../../modal/Modal';
import CommentActionsMenu from '../components/CommentActionsMenu';
import { deleteComment } from '../../../store/detailPost/actions';
import { dynamicDispatch } from '../../../helpers/dispatch';

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

const mapDispatchToProps = () => ({
    onDeleteComment: dynamicDispatch(deleteComment)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentyActionsModalContainder);