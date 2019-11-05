import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Post from './Post';
import withDynamicStore from 'common/dynamicStore';
import reducer from 'store/post/reducer';
import saga from 'store/post/saga';

const PostPage = () => {
    return (
        <Container className="has-padding-top-100">
            <Post />
        </Container>
    );
};

export default withDynamicStore(PostPage, {
    storeName: 'post',
    reducer,
    saga
});