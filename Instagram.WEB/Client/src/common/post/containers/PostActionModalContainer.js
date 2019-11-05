import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import modal from '../../modal/Modal';
import { unfollow } from '../../../store/profile/actions';
import { closeModal } from '../../../store/postActionsModal/actions';
import PostActionMenu from '../components/PostActionMenu';
import { useHistory } from 'react-router-dom';
import withDynamicStore from '../../dynamicStore';
import { dynamicDispatch } from '../../../helpers/dispatch';
import reducer from '../../../store/postActionsModal/reducer';
import { bindActionCreators } from 'redux';

const contentStyles = {
    width: '40%'
};

const PostActionsModal = modal(PostActionMenu, contentStyles);

const PostActionModalContainer = ({
    isOpen,
    userName,
    postId,
    unfollow,
    closeModal
}) => {

    const history = useHistory();

    const redirectToPost = useCallback(
        () => {
            closeModal();
            history.push(`/posts/${postId}`);
        },
        [closeModal, history, postId]
    );

    const handleUnfollow = useCallback(
        () => {
            unfollow(userName);
            closeModal();
        },
        [unfollow, userName, closeModal]
    );

    const handleCloseModal = () => closeModal();

    return (
        <PostActionsModal
            isOpen={isOpen}
            onRedirect={redirectToPost}
            onClose={handleCloseModal}
            onUnfollow={handleUnfollow}
        />
    );
};

PostActionModalContainer.propTypes = {
    isOpen: PropTypes.bool,
    postId: PropTypes.number,
    userName: PropTypes.string,

    closeModal: PropTypes.func,
    unfollow: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isOpen: state.postActionsModal.isOpen,
    postId: state.postActionsModal.data.postId
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        unfollow,
    }, dispatch),
    closeModal: dynamicDispatch(closeModal)
});

export default withDynamicStore(connect(mapStateToProps, mapDispatchToProps)(PostActionModalContainer), {
    storeName: 'postActionsModal',
    reducer,
});