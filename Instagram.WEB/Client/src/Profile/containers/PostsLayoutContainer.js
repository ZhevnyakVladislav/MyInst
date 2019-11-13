import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import { openModal, loadProfilePosts } from 'store/post/actions';
import ContentLoader from 'common/loaders/ContentLoader';
import PostsLoader from 'common/loaders/PostsLoader';
import PostsLayout from '../components/PostsLayout';
import { dynamicDispatch } from 'helpers/dispatch';
import useInfiniteScroll from 'common/hooks/useInfiniteScroll';

const PostsLayoutContainer = ({
    userName,
    data,
    loadPosts,
    isProfileDataLoading,
    isPostsDataLoading,
    isPrivate,
    hasMore,
    onPostModalOpen
}) => {

    const onPostsLoad = page => loadPosts({ userName, page });

    useInfiniteScroll(onPostsLoad, hasMore, isPostsDataLoading);


    // useEffect(
    //     () => {
    //         isDataLoaded && !isPrivate && loadPosts({ userName, page: 1 });
    //     },
    //     [isDataLoaded, isPrivate, loadPosts, userName]
    // );

    return (
        <Container className="has-margin-top-100">
            <ContentLoader
                isLoading={isProfileDataLoading}
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
    isDataLoaded: PropTypes.bool,
    hasMore: PropTypes.bool,

    loadPosts: PropTypes.func,
    onPostModalOpen: PropTypes.func
};

const mapStateToProps = (state) => ({
    isPrivate: state.profile.viewData.isPrivate,
    isDataLoaded: state.profile.isDataLoaded,
    data: state.post.posts,
    hasMore: state.post.hasMore,
    isProfileDataLoading: state.profile.isLoading,
    isPostsDataLoading: state.post.isLoading,
});

const mapDispatchToProps = () => ({
    loadPosts: dynamicDispatch(loadProfilePosts),
    onPostModalOpen: dynamicDispatch(openModal)
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PostsLayoutContainer)); 