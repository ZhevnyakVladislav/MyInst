import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';
import ProfileLayout from '../components/ProfileLayout';
import {
    loadViewProfileData,
    follow,
    openUnfollowModal,
    closeUnfollowModal
} from '../../store/profile/actions';
import { logOut } from '../../store/user/actions';
import SettingsModal from '../components/SettingsModal';
import FollowersModal from '../components/FollowersOrFollowingModal';
import UnfollowModal from '../components/UnfollowModal';
import { MODE } from '../components/FollowersOrFollowingModal';

class ProfileContainer extends React.PureComponent {

    state = {
        isSettingModalOpen: false,
        isFollowersOrFollowingOpen: false,
        mode: null,
    }

    static getDerivedStateFromProps(props) {
        if (props.profileData.error) {
            props.history.push('/notFound');
        }
        return null;
    }

    componentDidMount() {
        this.props.loadProfileData(this.props.match.params.username);
    }

    handleOpenModal = popup => mode => () => {
        this.setState({
            [popup]: true,
            mode: mode
        });
    }

    handleCloseModal = popup => () => {
        this.setState({
            [popup]: false,
            mode: null
        });
    }

    handleChangeFollowing = () => {
        this.props.profileData.isFollowing
            ? this.props.openUnfollowModal(this.props.profileData)
            : this.props.follow({ userName: this.props.profileData.userName });

    }

    handleLogout = () => {
        this.props.logOut();
        this.handleCloseModal();
    }

    render() {
        const { profileData, isOwner, isUnfollowModalOpen, closeUnfollowModal } = this.props;
        const {
            isSettingModalOpen,
            isFollowersOrFollowingOpen,
            mode,
        } = this.state;
        return (
            <Section className="has-padding-top-80">
                <ProfileLayout
                    openSettingsModal={this.handleOpenModal('isSettingModalOpen')(null)}
                    openFollowersModal={this.handleOpenModal('isFollowersOrFollowingOpen')(MODE.followers)}
                    openFollowingModal={this.handleOpenModal('isFollowersOrFollowingOpen')(MODE.following)}
                    isOwner={isOwner}
                    profileData={profileData}
                    onChangeFollowing={this.handleChangeFollowing}
                />
                <SettingsModal
                    isOpen={isSettingModalOpen}
                    onClose={this.handleCloseModal('isSettingModalOpen')}
                    onLogout={this.handleLogout}
                />
                <FollowersModal
                    isOpen={isFollowersOrFollowingOpen}
                    onClose={this.handleCloseModal('isFollowersOrFollowingOpen')}
                    mode={mode}
                />
                <UnfollowModal
                    isOpen={isUnfollowModalOpen}
                    onClose={closeUnfollowModal}
                />
            </Section>
        );
    }
}

ProfileContainer.propTypes = {
    match: PropTypes.object,
    profileData: PropTypes.object,
    isUserAuth: PropTypes.bool,
    error: PropTypes.object,
    history: PropTypes.object,
    isOwner: PropTypes.bool,
    isUnfollowModalOpen: PropTypes.bool,

    loadProfileData: PropTypes.func,
    logOut: PropTypes.func,
    follow: PropTypes.func,
    openUnfollowModal: PropTypes.func,
    closeUnfollowModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    profileData: state.profile.viewData,
    isOwner: state.user.userName === state.profile.viewData.userName,
    isUnfollowModalOpen: state.profile.unfollowModal.isOpen
});

const mapDispatchToProps = ({
    loadProfileData: loadViewProfileData,
    logOut,
    follow,
    openUnfollowModal,
    closeUnfollowModal
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer); 
