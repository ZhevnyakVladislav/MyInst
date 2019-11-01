import React from 'react';
import PropTypes from 'prop-types';
import modal from '../../modal/Modal';
import { connect } from 'react-redux';
import withDynamicStore from '../../dynamicStore/withDynamicStore';
import { dynamicDispatch } from '../../../helpers/dispatch';
import reducer from '../../../store/unfollowModal/reducer';
import { closeModal } from '../../../store/unfollowModal/actions';
import { bindActionCreators } from 'redux';

import Media from 'react-bulma-components/lib/components/media';
import Menu from 'react-bulma-components/lib/components/menu';
import Container from 'react-bulma-components/lib/components/container';
import Box from 'react-bulma-components/lib/components/box';
import { unfollow } from '../../../store/profile/actions';

const contentStyles = {
    width: '40%'
};

const UnfollowModalContainer = ({
    isOpen,
    profileData,
    onClose,
    unfollow
}) => {
    const handleClose = () => onClose();

    const handleUnfollow = () => {
        unfollow({ userName: profileData.userName });
        handleClose();
    };

    const Layout = () => (
        <Container>
            <Box>
                <Media className="is-flex flex-column align-items-center">
                    <Media.Item>
                        <figure className="image is-64x64">
                            <img className="is-rounded avatar" src={profileData.imageUrl} />
                        </figure>
                    </Media.Item>
                    <Media.Item>Unfollow {profileData.userName}?</Media.Item>
                </Media>
                <Menu>
                    <Menu.List>
                        <Menu.List.Item className="has-text-centered" onClick={handleUnfollow}>Unfollow</Menu.List.Item>
                        <Menu.List.Item className="has-text-centered" onClick={handleClose}>Cancel</Menu.List.Item>
                    </Menu.List>
                </Menu>
            </Box>
        </Container>
    );

    const UnfollowModal = modal(Layout, contentStyles);

    return <UnfollowModal
        isOpen={isOpen}
        onClose={handleClose}
    />;
};

UnfollowModalContainer.propTypes = {
    isOpen: PropTypes.bool,
    profileData: PropTypes.object,
    onClose: PropTypes.func,
    unfollow: PropTypes.func,
};

const mapStateToProps = state => ({
    isOpen: state.unfollowModal.isOpen,
    profileData: state.unfollowModal.data
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        unfollow
    }, dispatch),
    onClose: dynamicDispatch(closeModal),

});

export default withDynamicStore(connect(mapStateToProps, mapDispatchToProps)(UnfollowModalContainer), {
    storeName: 'unfollowModal',
    reducer,
});