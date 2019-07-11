import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Button from 'react-bulma-components/lib/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfileLayout = ({ profileData, isUserAuth, openSettingsModal }) => {
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
                                {isUserAuth ? <>
                                    <Button
                                        className="has-max-width-100 has-margin-left-10"
                                        renderAs="a"
                                        color="light"
                                    >
                                        <Link to="/profile/edit">Edit Profile</Link>
                                    </Button>
                                    <FontAwesomeIcon className="has-margin-left-10" icon={faCog} size="2x" onClick={openSettingsModal} />
                                </> : <Button
                                    className="has-max-width-100 has-margin-left-10"
                                    renderAs="a"
                                >
                                        Follow
                                </Button>
                                }
                            </Content>
                            <Content className="is-flex is-marginless">
                                <p className="has-margin-right-20"><strong>12</strong> posts</p>
                                <p className="has-margin-right-20"><strong>12</strong> followers</p>
                                <p><strong>12</strong> following</p>
                            </Content>
                            <Content className="is-flex is-marginless">
                                <h3>{profileData.fullName}</h3>
                            </Content>
                        </Columns.Column>
                    </Columns>
                </Columns.Column>
            </Columns>
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
    }),
    isUserAuth: PropTypes.bool,

    openSettingsModal: PropTypes.func
};

export default ProfileLayout;