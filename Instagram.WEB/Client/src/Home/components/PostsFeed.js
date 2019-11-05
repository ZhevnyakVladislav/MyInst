import React from 'react';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import PostContainer from '../containers/PostContainer';

const PostsFeed = ({ data }) => {
    return (
        <Columns centered>
            <Columns.Column size={8}>
                {data.map(post => <PostContainer key={post.id} {...post} />)}
            </Columns.Column>
        </Columns>
    );
};

PostsFeed.propTypes = {
    data: PropTypes.array,
};

export default PostsFeed;