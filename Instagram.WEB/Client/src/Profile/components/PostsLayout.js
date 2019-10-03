import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Card from 'react-bulma-components/lib/components/card';
import Tile from 'react-bulma-components/lib/components/tile';
import Image from 'react-bulma-components/lib/components/image';
import ClickablePost from './ClickablePost';

const PostsLayout = ({
    posts
}) => {
    return (
        <Container className="has-margin-top-100">
            <Tile size={12} className="wrap">
                <Tile size={4} kind="parent">
                    <Tile renderAs="article" kind="child">
                        <ClickablePost />
                    </Tile>
                </Tile>
                <Tile size={4} kind="parent">
                    <Tile renderAs="article" kind="child">
                        <Image size="square" src="http://bulma.io/images/placeholders/640x480.png" />
                    </Tile>
                </Tile>
                <Tile size={4} kind="parent">
                    <Tile renderAs="article" kind="child">
                        <Image size="square" src="http://bulma.io/images/placeholders/640x480.png" />
                    </Tile>
                </Tile>
                <Tile size={4} kind="parent">
                    <Tile renderAs="article" kind="child">
                        <Image size="square" src="http://bulma.io/images/placeholders/640x480.png" />
                    </Tile>
                </Tile>
            </Tile>
        </Container>
    );
};

PostsLayout.propTypes = {
    posts: PropTypes.array
};

export default PostsLayout;