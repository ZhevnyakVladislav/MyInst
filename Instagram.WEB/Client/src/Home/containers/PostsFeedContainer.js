import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dynamicDispatch } from 'helpers/dispatch';
import { loadFollowingPosts } from 'store/post/actions';
import PropsFeed from '../components/PostsFeed';

const PostsFeedContainer = ({
    data,
    loadFollowingPosts,
}) => {

    useEffect(
        () => {
            loadFollowingPosts();
        },
        [loadFollowingPosts]
    );

    return (
        <PropsFeed
            data={data}
        />
    );
};

PostsFeedContainer.propTypes = {
    data: PropTypes.array,

    loadFollowingPosts: PropTypes.func,
};

const mapStateToProps = (state) => ({
    data: state.post.posts,
});

const mapDispatchToProps = () => ({
    loadFollowingPosts: dynamicDispatch(loadFollowingPosts),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsFeedContainer);
