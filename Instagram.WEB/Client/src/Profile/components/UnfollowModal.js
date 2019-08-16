import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import modal from '../../common/components/Modal';
import Media from 'react-bulma-components/lib/components/media';
import Menu from 'react-bulma-components/lib/components/menu';
import { closeUnfollowModal, unfollow } from '../../store/profile/actions';


const SettingModal = ({ closeUnfollowModal, unfollow, profileData }) => {
    const handleChangeFollowing = () => {
        unfollow({ userName: profileData.userName });
    };

    return (
        <>
            <Media.Item position="center">
                <figure className="image is-64x64">
                    <img className="is-rounded avatar" src={profileData.imageUrl} />
                </figure>
            </Media.Item>
            <Media.Item className="has-text-centered">
                <p> Unfollow {profileData.userName}?</p>
            </Media.Item>
            <Menu>
                <Menu.List>
                    <Menu.List.Item className="has-text-centered" onClick={handleChangeFollowing}>Unfollow</Menu.List.Item>
                    <Menu.List.Item className="has-text-centered" onClick={closeUnfollowModal}>Cancel</Menu.List.Item>
                </Menu.List>
            </Menu>
        </>
    );
};

SettingModal.propTypes = {
    profileData: PropTypes.object,

    unfollow: PropTypes.func,
    closeUnfollowModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
    profileData: state.profile.unfollowModal.profileData

});

const mapDispatchToProps = ({
    unfollow,
    closeUnfollowModal
});

export default connect(mapStateToProps, mapDispatchToProps)(modal(SettingModal));