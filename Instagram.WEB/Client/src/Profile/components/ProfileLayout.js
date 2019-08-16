import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfileLayout = ({
    profileData,
    isOwner,
    openSettingsModal,
    onChangeFollowing,
    openFollowersModal,
    openFollowingModal
}) => {

    const isFollowersClickable = !profileData.isPrivate && !!profileData.followersCount;
    const isFollowingClickable = !profileData.isPrivate && !!profileData.followingCount;

    return (
        <Container>
            <Columns>
                <Columns.Column size={10} offset={1}>
                    <Columns>
                        <Columns.Column offset={1} size={3}>
                            <Media>
                                <Media.Item position="left">
                                    <figure className="image is-128x128">
                                        <img className="is-rounded avatar" src={profileData.imageUrl} />
                                    </figure>
                                </Media.Item>
                            </Media>
                        </Columns.Column>
                        <Columns.Column size={8}>

                            <Content className="is-flex is-marginless">
                                <h2>{profileData.userName}</h2>
                                {isOwner
                                    ? <>
                                        <Button
                                            className="has-max-width-100 has-margin-left-10"
                                            color="light"
                                        >
                                            <Link to="/profile/edit">Edit Profile</Link>
                                        </Button>
                                        <FontAwesomeIcon className="has-margin-left-10" icon={faCog} size="2x" onClick={openSettingsModal} />
                                    </>
                                    : <Button
                                        color={profileData.isFollowing ? '' : 'primary'}
                                        className="has-max-width-100 has-margin-left-10"
                                        onClick={onChangeFollowing}
                                    >
                                        {profileData.isFollowing ? 'Following' : 'Follow'}
                                    </Button>
                                }
                            </Content>
                            <Content className="is-flex is-marginless">
                                <p className="has-margin-right-20"><strong>{profileData.postsCount}</strong> posts</p>
                                <p className={`has-margin-right-20 ${isFollowersClickable && 'has-cursor-pointer'}`} onClick={isFollowersClickable ? openFollowersModal : () => null}><strong>{profileData.followersCount}</strong> followers</p>
                                <p className={`${isFollowingClickable && 'has-cursor-pointer'}`} onClick={isFollowingClickable ? openFollowingModal : () => null}><strong>{profileData.followingCount}</strong> following</p>
                            </Content>
                            <Content className="is-flex is-marginless">
                                <h3>{profileData.fullName}</h3>
                            </Content>
                        </Columns.Column>
                    </Columns>
                </Columns.Column>
            </Columns>
            {profileData.isPrivate
                ? <Columns>
                    <Columns.Column size={12}>
                        <Box className="has-text-centered">
                            <h1>This Account is Private</h1>
                            <p className="has-margin-top-20">Follow to see their photos and videos.</p>
                        </Box>
                    </Columns.Column>
                </Columns> : null}


        </Container>
    );
};

ProfileLayout.propTypes = {
    profileData: PropTypes.shape({
        image: PropTypes.string,
        userName: PropTypes.string,
        fullName: PropTypes.string,
        imageUrl: PropTypes.string,
        postsCount: PropTypes.number,
        followersCount: PropTypes.number,
        followingCount: PropTypes.number,
        isPrivate: PropTypes.bool,
        isFollowing: PropTypes.bool,
    }),
    isOwner: PropTypes.bool,
    openSettingsModal: PropTypes.func,
    openFollowersModal: PropTypes.func,
    openFollowingModal: PropTypes.func,
    onChangeFollowing: PropTypes.func,
};

export default ProfileLayout;