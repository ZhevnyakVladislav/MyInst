import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bulma-components/lib/components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const ClickablePost = ({
    data,
    onPostModalOpen
}) => {

    const [isHovered, changeIsHovered] = useState(false);
    const handleMouseEnter = useCallback(() => changeIsHovered(true), []);
    const handleMouseLeave = useCallback(() => changeIsHovered(false), []);
    const handlePostModalOpen = useCallback(() => onPostModalOpen(data.id), []);

    return (
        <div className="clickable-post has-background-grey-lighter"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handlePostModalOpen}
        >
            <div className={`blind blind-${isHovered ? 'open' : 'close'}`}>
                <div className="is-flex align-items-center has-padding-right-10">
                    <FontAwesomeIcon className="has-text-white" icon={faHeart} size="2x" />
                    <h1 className="has-text-white">{data.likesCount}</h1>
                </div>
                <div className="is-flex align-items-center">
                    <FontAwesomeIcon className="has-text-white" icon={faComment} size="2x" />
                    <h1 className="has-text-white">{data.commentsCount}</h1>
                </div>
            </div>
            <Image size="square" src={data.url} />
        </div>);
};

ClickablePost.propTypes = {
    data: PropTypes.object,
    onPostModalOpen: PropTypes.func
};

export default React.memo(ClickablePost);