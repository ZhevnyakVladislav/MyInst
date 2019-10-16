import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import modal from '../../modal/Modal';
import { unfollow } from '../../../../store/profile/actions';
import { closeModal } from '../../../../store/postActionsModal/actions';
import PostActionMenu from '../components/PostActionMenu';

const contentStyles = {
    width: '40%'
};

const PostActionsModal = modal(PostActionMenu, contentStyles);

const PostActionMenuContainer = ({
    isOpen,
    userName,
    // postId, TODO: implement 'Go to post' link
    unfollow,
    closeModal
}) => {

    const handleUnfollow = useCallback(
        () => {
            unfollow(userName);
            closeModal();
        },
        [unfollow, userName, closeModal]
    );

    const handleCloseModal = useCallback(
        () => {
            closeModal();
        },
        [closeModal]
    );

    return (
        <PostActionsModal
            isOpen={isOpen}
            onClose={handleCloseModal}
            onUnfollow={handleUnfollow}
        />
    );
};

PostActionMenuContainer.propTypes = {
    isOpen: PropTypes.bool,
    postId: PropTypes.number,
    userName: PropTypes.string,

    closeModal: PropTypes.func,
    unfollow: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isOpen: state.postActionsModal.isOpen
});

const mapDispatchToProps = ({
    unfollow: unfollow,
    closeModal: closeModal
});

export default connect(mapStateToProps, mapDispatchToProps)(PostActionMenuContainer);
