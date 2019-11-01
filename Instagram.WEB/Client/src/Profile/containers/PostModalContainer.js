import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import modal from '../../common/modal/Modal';
import { connect } from 'react-redux';
import { closeModal } from '../../store/detailPost/actions';
import withDynamicStore from '../../common/dynamicStore/withDynamicStore';
import { dynamicDispatch } from '../../helpers/dispatch';
import reducer from '../../store/detailPost/reducer';
import saga from '../../store/detailPost/saga';
import DetailPostContainer from '../../common/post/containers/DetailPostContainer';

const PostModal = modal(DetailPostContainer);

const PostModalContainer = ({
    isOpen,
    onCloseModal,
}) => {

    const handleClosePostModal = () => onCloseModal();

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

    onCloseModal: PropTypes.func,
};

const mapStateToProps = state => ({
    isOpen: state.detailPost.isModalOpen
});

const mapDispatchToProps = () => ({
    onCloseModal: dynamicDispatch(closeModal),
});

export default withDynamicStore(connect(mapStateToProps, mapDispatchToProps)(PostModalContainer), {
    storeName: 'detailPost',
    reducer,
    saga,
});