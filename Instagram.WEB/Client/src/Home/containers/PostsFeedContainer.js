import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dynamicDispatch } from 'helpers/dispatch';
import { loadFollowingPosts } from 'store/post/actions';
import PropsFeed from '../components/PostsFeed';
import useInfiniteScroll from 'common/hooks/useInfiniteScroll';

const PostsFeedContainer = ({
    data,
    hasMore,
    isPostsDataLoading,
    loadFollowingPosts,
}) => {

    const onPostsLoad = page => loadFollowingPosts({ page });

    useInfiniteScroll(onPostsLoad, hasMore, isPostsDataLoading);

    return (
        <PropsFeed
            data={data}
        />
    );
};

PostsFeedContainer.propTypes = {
    data: PropTypes.array,
    isPostsDataLoading: PropTypes.bool,
    hasMore: PropTypes.bool,

    loadFollowingPosts: PropTypes.func,
};

const mapStateToProps = (state) => ({
    data: state.post.posts,
    hasMore: state.post.hasMore,
    isPostsDataLoading: state.post.isLoading,
});

const mapDispatchToProps = () => ({
    loadFollowingPosts: dynamicDispatch(loadFollowingPosts),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsFeedContainer);
