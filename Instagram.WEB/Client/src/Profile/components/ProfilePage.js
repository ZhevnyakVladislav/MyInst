import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import ProfileLayoutContainer from '../containers/ProfileLayoutContainer';
import PostsLayoutContainer from '../containers/PostsLayoutContainer';
import PostModalContainer from '../containers/PostModalContainer';

const ProfilePage = ({
    match
}) => (
    <Container className="has-padding-top-100">
        <ProfileLayoutContainer userName={match.params.username} />
        <PostsLayoutContainer userName={match.params.username} />
        <PostModalContainer />
    </Container>
);

export default ProfilePage;