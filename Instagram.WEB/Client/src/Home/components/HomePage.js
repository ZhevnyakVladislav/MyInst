import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import PostsFeedContainer from '../containers/PostsFeedContainer';
import PostActionMenuContainer from '../../common/post/containers/PostActionModalContainer';
import withDynamicStore from 'common/dynamicStore';
import reducer from 'store/post/reducer';
import saga from 'store/post/saga';

const HomePage = () => {
    return (
        <Container className="has-padding-top-100">
            <PostsFeedContainer id={232323} />
            <PostActionMenuContainer />
        </Container>
    );
};

export default withDynamicStore(HomePage, {
    storeName: 'post',
    reducer,
    saga
});