import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import modal from '../../common/modal/Modal';
import ProfileActionsMenu from '../components/ProfileActionsMenu';
import { logOut } from '../../store/user/actions';

const contentStyles = {
    width: '40%'
};

const ProfileActionsModal = modal(ProfileActionsMenu, contentStyles);

const ProfileActionsModalContainer = ({
    isOpen,
    onClose,
    logOut
}) => {

    const handleCloseModal = useCallback(
        () => {
            onClose();
        },
        [onClose]
    );

    return (
        <ProfileActionsModal
            isOpen={isOpen}
            onClose={handleCloseModal}
            onLogout={logOut}
        />
    );
};

ProfileActionsModalContainer.propTypes = {
    isOpen: PropTypes.bool,

    onClose: PropTypes.func,
    logOut: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
    logOut: logOut
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileActionsModalContainer);
