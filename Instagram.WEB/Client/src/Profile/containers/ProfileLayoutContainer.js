import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import { bindActionCreators } from 'redux';

import {
    loadViewProfileData,
    follow,
} from '../../store/profile/actions';

import ContentLoader from '../../common/loaders/ContentLoader';
import AvatarWithTextLoader from '../../common/loaders/AvatarWithTextLoader';
import ProfileLayout from '../components/ProfileLayout';
import ProfileActionsModalContainer from './ProfileActionsModalContainer';

import { openModal as openUsersModal } from '../../store/usersModal/actions';
import { openModal as openUnfollowModal } from '../../store/unfollowModal/actions';
import { dynamicDispatch } from '../../helpers/dispatch';
import { UsersModalTypes } from '../../common/usersModal/constants';

const ProfileLayoutContainer = ({
    profileData,
    isOwner,
    loadProfileData,
    isLoading,
    follow,
    userName,
    openUsersModal,
    openUnfollowModal
}) => {

    useEffect(
        () => {
            loadProfileData(userName);
        },
        [loadProfileData, userName]
    );

    const [isModalOpen, handleChangeModalState] = useState(false);

    const handleOpenUsersModal = useCallback(
        (modalType) => () => {
            openUsersModal({
                userName: userName,
                modalType: modalType
            });
        },
        [openUsersModal, userName]
    );


    const handleChangeFollowing = useCallback(
        () => {
            profileData.isFollowing
                ? openUnfollowModal({
                    userName: profileData.userName,
                    imageUrl: profileData.imageUrl
                })
                : follow({ userName: profileData.userName });
        },
        [follow, openUnfollowModal, profileData]
    );

    return (
        <>
            <Container>
                <Columns>
                    <Columns.Column size={9} offset={2}>
                        <ContentLoader
                            isReady={!!profileData.userName}
                            isLoading={isLoading}
                            loaderContent={
                                <AvatarWithTextLoader />
                            }
                        >
                            <ProfileLayout
                                isOwner={isOwner}
                                profileData={profileData}
                                openSettingsModal={() => handleChangeModalState(true)}
                                openFollowersModal={handleOpenUsersModal(UsersModalTypes.Followers)}
                                openFollowingModal={handleOpenUsersModal(UsersModalTypes.Following)}
                                onChangeFollowing={handleChangeFollowing}
                                onOpenUnfollowModal={openUnfollowModal}
                            />
                        </ContentLoader>
                    </Columns.Column>
                </Columns>
            </Container>
            <ProfileActionsModalContainer
                isOpen={isModalOpen}
                onClose={() => handleChangeModalState(false)}
            />
        </>
    );
};

ProfileLayoutContainer.propTypes = {
    profileData: PropTypes.object,
    isOwner: PropTypes.bool,
    isLoading: PropTypes.bool,
    userName: PropTypes.string,

    loadProfileData: PropTypes.func,
    follow: PropTypes.func,
    openUsersModal: PropTypes.func,
    openUnfollowModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
    profileData: state.profile.viewData,
    isLoading: state.profile.isLoading,
    isOwner: state.user.data.userName === state.profile.viewData.userName,
});
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        loadProfileData: loadViewProfileData,
        follow
    }, dispatch),
    openUsersModal: dynamicDispatch(openUsersModal),
    openUnfollowModal: dynamicDispatch(openUnfollowModal),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ProfileLayoutContainer)); 