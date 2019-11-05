import React from 'react';
import PropTypes from 'prop-types';
import modal from 'common/modal/Modal';
import { connect } from 'react-redux';
import { closeModal } from 'store/post/actions';
import { dynamicDispatch } from 'helpers/dispatch';
import DetailPostContainer from 'common/post/containers/DetailPostContainer';

const PostModal = modal(DetailPostContainer);

const PostModalContainer = ({
    isOpen,
    onCloseModal,
}) => {

    const handleClosePostModal = () => onCloseModal();

    return (
        <PostModal
            isOpen={isOpen}
            onClose={handleClosePostModal}
        />
    );
};

PostModalContainer.propTypes = {
    isOpen: PropTypes.bool,

    onCloseModal: PropTypes.func,
};

const mapStateToProps = state => ({
    isOpen: state.post.isDetailPostModalOpen
});

const mapDispatchToProps = () => ({
    onCloseModal: dynamicDispatch(closeModal),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModalContainer);