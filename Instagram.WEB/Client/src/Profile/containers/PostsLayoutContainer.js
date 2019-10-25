import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';

import {
    loadProfilePosts,
    openPostModal
} from '../../store/posts/actions';

import ContentLoader from '../../common/loaders/ContentLoader';
import PostsLoader from '../../common/loaders/PostsLoader';
import PostsLayout from '../components/PostsLayout';

const PostsLayoutContainer = ({
    userName,
    data,
    loadPosts,
    isProfileDataLoading,
    isPostsDataLoading,
    isPrivate,
    onPostModalOpen
}) => {

    useEffect(
        () => {
            !isPrivate && loadPosts(userName);
        },
        [isPrivate]
    );

    return (
        <Container className="has-margin-top-100">
            <ContentLoader
                isLoading={isProfileDataLoading || isPostsDataLoading}
                loaderContent={
                    <Columns centered>
                        <Columns.Column size={12}>
                            <PostsLoader />
                        </Columns.Column>
                    </Columns>
                }
            >
                {isPrivate
                    ? <Columns>
                        <Columns.Column size={12}>
                            <Box className="has-text-centered">
                                <h1>This Account is Private</h1>
                                <p className="has-margin-top-20">Follow to see their photos and videos.</p>
                            </Box>
                        </Columns.Column>
                    </Columns>
                    : <PostsLayout
                        isPrivate={isPrivate}
                        onPostModalOpen={onPostModalOpen}
                        data={data}
                    />}
            </ContentLoader>
        </Container>
    );
};

PostsLayoutContainer.propTypes = {
    userName: PropTypes.string,
    data: PropTypes.array,
    isProfileDataLoading: PropTypes.bool,
    isPostsDataLoading: PropTypes.bool,
    isPrivate: PropTypes.bool,

    loadPosts: PropTypes.func,
    onPostModalOpen: PropTypes.func
};

const mapStateToProps = (state) => ({
    isPrivate: state.profile.viewData.isPrivate,
    data: state.posts.profilePosts,
    isProfileDataLoading: state.profile.isLoading,
    // isPostsDataLoading: state.posts.isLoading
});

const mapDispatchToProps = ({
    loadPosts: loadProfilePosts,
    onPostModalOpen: openPostModal
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PostsLayoutContainer)); 