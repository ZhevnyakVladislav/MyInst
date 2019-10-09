import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns';
import Hero from 'react-bulma-components/lib/components/hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import TextInput from '../../common/components/inputs/TextInput';
import Button from 'react-bulma-components/lib/components/button';
import CommentActionsModalContainer from '../containers/CommentActionsModalContainer';

const PostLayout = ({
    id,
    createdBy,
    // createdAt,
    url,
    // description,
    // commentsCount,
    // likesCount,
    comments,
    // likes,
    currentUserName,
    onPostComment
}) => {

    const [comment, onChange] = useState('');
    const [commentActionMenuId, changeCommentActionMenuId] = useState(-1);
    const [isCommentActionMenuOpen, changeCommentOptionMenuState] = useState(false);
    const handleChangeComment = useCallback(
        () => e => onChange(e.target.value),
        [onChange]
    );

    const postComment = useCallback(
        (e) => {
            e.preventDefault();
            onPostComment({
                postId: id,
                text: comment
            });
            onChange('');
        },
        [comment, id, onChange]
    );

    const handleOpenCommentActionMenu = useCallback(
        commentId => () => {
            changeCommentActionMenuId(commentId);
            changeCommentOptionMenuState(true);
        },
        [changeCommentOptionMenuState, changeCommentActionMenuId]
    );

    const handleCloseCommentActionMenu = useCallback(
        () => changeCommentOptionMenuState(false),
        [changeCommentOptionMenuState]
    );

    return (
        <>
            <Columns className="has-background-white" centered gapless>
                <Columns.Column size={8}>
                    <Image size="square" src={url} />
                </Columns.Column>
                <Columns.Column className="is-flex" size={4}>
                    <Hero className="is-full-width">
                        <Hero.Head renderAs="header" className="has-padding-15">
                            <Media>
                                <Media.Item renderAs="figure" position="left">
                                    <figure className="image is-32x32">
                                        <img className="is-rounded avatar" src={createdBy.imageUrl} />
                                    </figure>
                                </Media.Item>
                                <Media.Item position="center">
                                    <Heading size={6}>{createdBy.userName}</Heading>
                                </Media.Item>
                            </Media>
                        </Hero.Head>
                        <Hero.Body className="has-padding-15">
                            {comments.map(comment => (
                                <Media key={comment.id} className="is-borderless">
                                    <Media.Item renderAs="figure" position="left">
                                        <figure className="image is-32x32">
                                            <img className="is-rounded avatar" src={comment.createdBy.imageUrl} />
                                        </figure>
                                    </Media.Item>
                                    <Media.Item>
                                        <Heading className="is-marginless" size={6}>{comment.createdBy.userName}</Heading>
                                        <Content>
                                            {comment.text}
                                            {/* <a href="#1">#css</a> <a href="#2">#responsive</a> */}
                                            <br />
                                            <time dateTime="2016-1-1">{comment.createdAt}</time>
                                        </Content>
                                    </Media.Item>
                                    {currentUserName === (createdBy.userName || comment.createdBy.userName) &&
                                        <FontAwesomeIcon icon={faEllipsisH} onClick={handleOpenCommentActionMenu(comment.id)} size="2x" />
                                    }
                                </Media>
                            ))}
                        </Hero.Body>
                        <Hero.Footer className="has-padding-15">
                            <span className="has-margin-right-10">
                                <FontAwesomeIcon icon={faHeart} size="2x" />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faComment} size="2x" />
                            </span>
                            <div>
                                <b>13 likes</b>
                            </div>
                        </Hero.Footer>
                        <form onSubmit={null}>
                            <Columns gapless>
                                <Columns.Column size={8}>
                                    <TextInput
                                        isTextarea
                                        name="comment"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        handleChange={handleChangeComment}
                                        className="is-borderless"
                                        styles={{
                                            borderRadius: 0,
                                            boxShadow: 'none',
                                            resize: 'none',
                                            height: '53px'
                                        }}
                                    />
                                </Columns.Column>
                                <Columns.Column size={4} className="align-self-center">
                                    <Button
                                        className="is-full-width"
                                        color="white"
                                        onClick={postComment}
                                    >
                                        Post
                                    </Button>
                                </Columns.Column>
                            </Columns>
                        </form>
                    </Hero>
                </Columns.Column>
            </Columns>
            <CommentActionsModalContainer
                isOpen={isCommentActionMenuOpen}
                postId={id}
                commentId={commentActionMenuId}
                onClose={handleCloseCommentActionMenu}
            />
        </>
    );
};

PostLayout.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    createdBy: PropTypes.object,
    createdAt: PropTypes.string,
    url: PropTypes.string,
    commentsCount: PropTypes.number,
    likesCount: PropTypes.number,
    comments: PropTypes.array,
    likes: PropTypes.array,
    currentUserName: PropTypes.string,

    onPostComment: PropTypes.func
};

export default React.memo(PostLayout);