import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import modal from '../../common/modal/Modal';
import { connect } from 'react-redux';
import { closePostModal } from '../../store/posts/actions';
import DetailPostContainer from '../../common/post/containers/DetailPostContainer';

const PostModal = modal(DetailPostContainer);

const PostModalContainer = ({
    isOpen,
    onClosePostModal,
}) => {

    const handleClosePostModal = useCallback(() => onClosePostModal(), []);

    return (
        <>
            <PostModal
                isOpen={isOpen}
                onClose={handleClosePostModal}
            />
        </>
    );
};

PostModalContainer.propTypes = {
    isOpen: PropTypes.bool,

    onClosePostModal: PropTypes.func,
};

const mapStateToProps = state => ({
    isOpen: state.posts.postModal.isOpen
});

const mapDispatchToProps = ({
    onClosePostModal: closePostModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModalContainer);