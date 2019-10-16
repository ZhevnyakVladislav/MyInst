import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Heading from 'react-bulma-components/lib/components/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const PostTitle = ({
    postId,
    createdBy,
    openPostActionMenu
}) => {
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
                            <Heading size={6}>{createdBy.userName}</Heading>
                        </Media.Item>
                        <Media.Item position="right">
                            <FontAwesomeIcon icon={faEllipsisH} size="2x" onClick={openPostActionMenu} />
                        </Media.Item>
                    </Media>
                </Card.Header.Title>
            </Card.Header>
        </>
    );
};

PostTitle.propTypes = {
    createdBy: PropTypes.object
};

export default PostTitle;