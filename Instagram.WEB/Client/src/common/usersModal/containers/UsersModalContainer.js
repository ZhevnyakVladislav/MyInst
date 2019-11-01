import React from 'react';
import PropTypes from 'prop-types';
import modal from '../../modal/Modal';
import { connect } from 'react-redux';
import withDynamicStore from '../../dynamicStore/withDynamicStore';
import { dynamicDispatch } from '../../../helpers/dispatch';
import UsersList from '../components/UsersList';
import reducer from '../../../store/usersModal/reducer';
import saga from '../../../store/usersModal/saga';
import {
    closeModal,
    loadData
} from '../../../store/usersModal/actions';
import { openModal } from '../../../store/unfollowModal/actions';
import { follow } from '../../../store/profile/actions';
import { bindActionCreators } from 'redux';

const UsersModal = modal(UsersList);

const UsersModalContainer = React.memo(({
    isOpen,
    closeModal,
    loadData,
    modalType,
    data,
    currentUserName,
    openModal,
    onFollow,
    isLoading
}) => {
    const handleClose = () => closeModal();

    return (
        <UsersModal
            isOpen={isOpen}
            onClose={handleClose}
            modalType={modalType}
            loadData={loadData}
            data={data}
            currentUserName={currentUserName}
            onUnfollowModalOpen={openModal}
            onFollow={onFollow}
            isLoading={isLoading}
        />
    );
});

UsersModalContainer.propTypes = {
    isOpen: PropTypes.bool,
    modalType: PropTypes.number,
    data: PropTypes.array,
    currentUserName: PropTypes.string,
    isLoading: PropTypes.bool,

    closeModal: PropTypes.func,
    loadData: PropTypes.func,
    openModal: PropTypes.func,
    onFollow: PropTypes.func,
};

const mapStateToProps = state => ({
    isOpen: state.usersModal.isOpen,
    modalType: state.usersModal.modalType,
    data: state.usersModal.data,
    currentUserName: state.user.data.userName,
    isLoading: state.usersModal.isLoading
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        onFollow: follow
    }, dispatch),
    closeModal: dynamicDispatch(closeModal),
    loadData: dynamicDispatch(loadData),
    openModal: dynamicDispatch(openModal)
});

export default withDynamicStore(connect(mapStateToProps, mapDispatchToProps)(UsersModalContainer), {
    storeName: 'usersModal',
    reducer,
    saga,
});