import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Post from './Post';

const PostPage = () => {
    return (
        <Container className="has-padding-top-100">
            <Post />
        </Container>
    );
};

export default PostPage;