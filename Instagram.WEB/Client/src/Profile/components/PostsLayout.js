import React, { useEffect } from 'react';
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
                {data.map(post => (
                    <Tile key={post.id} size={4} kind="parent">
                        <Tile renderAs="article" kind="child">
                            <ClickablePost
                                data={post}
                                onPostModalOpen={onPostModalOpen}
                            />
                        </Tile>
                    </Tile>
                ))}
            </Tile>
        </Container>
    );
};

PostsLayout.propTypes = {
    data: PropTypes.array,
    onDataLoad: PropTypes.func,
    onPostModalOpen: PropTypes.func
};

export default React.memo(PostsLayout);