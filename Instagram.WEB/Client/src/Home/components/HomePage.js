import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import PostsFeedContainer from '../containers/PostsFeedContainer';
import PostActionMenuContainer from '../../common/components/post/containers/PostActionMenuContainer';

const HomePage = () => {
    return (
        <Container className="has-padding-top-100">
            <PostsFeedContainer />
            <PostActionMenuContainer />
        </Container>
    );
};

export default HomePage;