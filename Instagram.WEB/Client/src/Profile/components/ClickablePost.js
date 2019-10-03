import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bulma-components/lib/components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const ClickablePost = ({
    src,
    onClick
}) => {

    const [isHovered, changeIsHovered] = useState(false);
    const handleMouseEnter = useCallback(() => changeIsHovered(true), []);
    const handleMouseLeave = useCallback(() => changeIsHovered(false), []);

    return (
        <div className="clickable-post"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <div className={`blind blind-${isHovered ? 'open' : 'close'}`}>
                <div className="is-flex align-items-center has-padding-right-10">
                    <FontAwesomeIcon className="has-text-white" icon={faHeart} size="2x" />
                    <h1 className="has-text-white">10</h1>
                </div>
                <div className="is-flex align-items-center">
                    <FontAwesomeIcon className="has-text-white" icon={faComment} size="2x" />
                    <h1 className="has-text-white">2</h1>
                </div>
            </div>
            <Image size="square" src="http://bulma.io/images/placeholders/640x480.png" />
        </div>);
};

ClickablePost.propTypes = {
    src: PropTypes.string,
    onClick: PropTypes.func
};

export default ClickablePost;