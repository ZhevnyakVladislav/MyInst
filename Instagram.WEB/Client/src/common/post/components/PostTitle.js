import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Heading from 'react-bulma-components/lib/components/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PostTitle = ({
    postId,
    createdBy,
    openPostActionMenu
}) => {

    const handlePostActionMenuOpen = useCallback(
        () => {
            openPostActionMenu({ postId, createdBy });
        },
        [openPostActionMenu, postId, createdBy]
    );

    return (
        <>
            <Card.Header>
                <Card.Header.Title>
                    <Media className="is-full-width align-items-center">
                        <Media.Item position="left">
                            <figure className="image is-32x32">
                                <img className="is-rounded avatar" src={createdBy.imageUrl} />
                            </figure>
                        </Media.Item>
                        <Media.Item>
                            <Link to={`/users/${createdBy.userName}`}>
                                <Heading size={6}>{createdBy.userName}</Heading>
                            </Link>
                        </Media.Item>
                        <Media.Item position="right">
                            <FontAwesomeIcon icon={faEllipsisH} size="1x" onClick={handlePostActionMenuOpen} />
                        </Media.Item>
                    </Media>
                </Card.Header.Title>
            </Card.Header>
        </>
    );
};

PostTitle.propTypes = {
    postId: PropTypes.number,
    createdBy: PropTypes.object,
    openPostActionMenu: PropTypes.func
};

export default PostTitle;