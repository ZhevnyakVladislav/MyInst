import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';

import {
    loadViewProfileData,
    follow,
    openUnfollowModal,
    closeUnfollowModal
} from '../../store/profile/actions';

import {
    loadProfilePosts
} from '../../store/posts/actions';

import { logOut } from '../../store/user/actions';
import { MODE } from '../components/FollowersOrFollowingModal';

import SettingsModal from '../components/SettingsModal';
import FollowersModal from '../components/FollowersOrFollowingModal';
import UnfollowModal from '../components/UnfollowModal';
import ProfileLayout from '../components/ProfileLayout';
import PostsLayout from '../components/PostsLayout';
import PostModal from './PostModalContainer';
import ContentLoader from '../../common/components/loaders/ContentLoader';
import AvatarWithTextLoader from '../../common/components/loaders/AvatarWithTextLoader';

import ProfileLayoutContainer from '../containers/ProfileLayoutContainer';
import PostsLayoutContainer from '../containers/PostsLayoutContainer';
import PostModalContainer from '../containers/PostModalContainer';

class ProfileContainer extends React.PureComponent {
    state = {
        isSettingModalOpen: false,
        isFollowersOrFollowingOpen: false,
        isPostModalOpen: false,
        mode: null,
    }

    static getDerivedStateFromProps(props) {
        if (props.profileData.error) {
            props.history.push('/notFound');
        }
        return null;
    }

    componentDidMount() {
        // this.props.loadProfileData(this.props.match.params.username);
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

    handlePostModalOpen = () => {
        this.setState({ isPostModalOpen: true });
    }

    handlePostModalClose = () => {
        this.setState({ isPostModalOpen: false });
    }

    handleLogout = () => {
        this.props.logOut();
        this.handleCloseModal();
    }

    loadPosts = () => {
        this.props.loadProfilePosts(this.props.profileData.userName);
    }

    render() {
        const {
            profileData,
            isUnfollowModalOpen,
            closeUnfollowModal,
            profilePosts,
        } = this.props;

        const {
            isSettingModalOpen,
            isFollowersOrFollowingOpen,
            mode,
            isPostModalOpen
        } = this.state;

        const userName = this.props.match.params.username;
        return (
            <Section className="has-padding-top-80">
                <ProfileLayoutContainer userName={userName} />
                <PostsLayoutContainer userName={userName} />
                <PostModalContainer />

                {/* {!profileData.isPrivate &&
                    <PostsLayout
                        onPostModalOpen={this.handlePostModalOpen}
                        data={profilePosts}
                        onDataLoad={this.loadPosts}
                    />
                } */}
                <SettingsModal
                    isOpen={isSettingModalOpen}
                    onClose={this.handleCloseModal('isSettingModalOpen')}
                    onLogout={this.handleLogout}
                    size={6}
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
                {/* <PostModal
                    isOpen={isPostModalOpen}
                    onClose={this.handlePostModalClose}
                    size={10}
                /> */}
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
    profilePosts: PropTypes.array,

    loadProfileData: PropTypes.func,
    logOut: PropTypes.func,
    follow: PropTypes.func,
    openUnfollowModal: PropTypes.func,
    closeUnfollowModal: PropTypes.func,
    loadProfilePosts: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    profileData: state.profile.viewData,
    isLoading: state.profile.isLoading,
    isOwner: state.user.data.userName === state.profile.viewData.userName,
    isUnfollowModalOpen: state.profile.unfollowModal.isOpen,
    profilePosts: state.posts.profilePosts
});

const mapDispatchToProps = ({
    loadProfileData: loadViewProfileData,
    logOut,
    follow,
    openUnfollowModal,
    closeUnfollowModal,
    loadProfilePosts
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer); 
