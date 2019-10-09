import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';

import {
    loadViewProfileData,
    follow,
    openUnfollowModal
} from '../../store/profile/actions';

import ContentLoader from '../../common/components/loaders/ContentLoader';
import AvatarWithTextLoader from '../../common/components/loaders/AvatarWithTextLoader';
import ProfileLayout from '../components/ProfileLayout';

const ProfileLayoutContainer = ({
    profileData,
    isOwner,
    loadProfileData,
    isLoading,
    userName
}) => {

    useEffect(
        () => {
            loadProfileData(userName);
        },
        []
    );

    const handleChangeFollowing = useCallback(
        () => {
            profileData.isFollowing
                ? openUnfollowModal(profileData)
                : follow({ userName: profileData.userName });
        },
        [openUnfollowModal, follow]
    );

    return (
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
                            openSettingsModal={() => console.log('openSettingsModal')}
                            openFollowersModal={() => console.log('openFollowersModal')}
                            openFollowingModal={() => console.log('openFollowingModal')}
                            onChangeFollowing={handleChangeFollowing}
                        />
                    </ContentLoader>
                </Columns.Column>
            </Columns>
        </Container>
    );
};

ProfileLayoutContainer.propTypes = {
    profileData: PropTypes.object,
    isOwner: PropTypes.bool,
    isLoading: PropTypes.bool,
    userName: PropTypes.string,

    loadProfileData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    profileData: state.profile.viewData,
    isLoading: state.profile.isLoading,
    isOwner: state.user.data.userName === state.profile.viewData.userName,
});

const mapDispatchToProps = ({
    loadProfileData: loadViewProfileData,
    follow,
    openUnfollowModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ProfileLayoutContainer)); 