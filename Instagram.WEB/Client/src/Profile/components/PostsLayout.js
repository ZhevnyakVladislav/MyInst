import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Tile from 'react-bulma-components/lib/components/tile';
import ClickablePost from './ClickablePost';

const PostsLayout = ({
    onPostModalOpen,
    data,
}) => {
    return (
        <Container className="has-margin-top-100">
            <Tile size={12} className="wrap">
                {data.map(post => <ClickablePost
                    key={post.id}
                    data={post}
                    onPostModalOpen={onPostModalOpen}
                />
                )}
            </Tile>
        </Container>
    );
};

PostsLayout.propTypes = {
    data: PropTypes.array,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,

    onPostModalOpen: PropTypes.func,
    onPostsLoad: PropTypes.func,
};

export default React.memo(PostsLayout);