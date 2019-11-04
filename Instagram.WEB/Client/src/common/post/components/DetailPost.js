import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bulma-components/lib/components/card';
import CommentActionsModalContainer from '../containers/CommentActionsModalContainer';
import PostTitle from './PostTitle';
import CommentPostForm from './CommentPostForm';
import ContentLoader from '../../loaders/ContentLoader';
import DetailPostLoader from '../../loaders/DetailPostLoader';
import { UsersModalTypes } from '../../usersModal/constants';

const DetailPost = ({
    id,
    createdBy,
    url,
    comments,
    likes,
    currentUserName,
    onPostComment,
    onLikePost,
    onDeleteLike,
    openPostActionMenu,
    isLoading,
    openUsersModal
}) => {
    const [commentActionMenuId, changeCommentActionMenuId] = useState(-1);
    const [isCommentActionMenuOpen, changeCommentOptionMenuState] = useState(false);

    const isLikesClickable = useMemo(() => likes.length > 0, [likes]);

    const postComment = useCallback(
        (comment) => {
            onPostComment({
                postId: id,
                text: comment
            });
        },
        [id, onPostComment]
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

    const isLiked = useMemo(
        () => likes.map(l => l.createdBy.userName).includes(currentUserName),
        [likes, currentUserName]
    );

    const handleLike = useCallback(
        () => {
            isLikesClickable
                ? onDeleteLike(id)
                : onLikePost(id);
        },
        [isLikesClickable, onDeleteLike, id, onLikePost]
    );

    const handleOpenLikesModal = useCallback(
        () => {
            if (likes.length > 0) {
                openUsersModal({
                    postId: id,
                    modalType: UsersModalTypes.Likes
                });
            }
        },
        [id, likes.length, openUsersModal]
    );

    return (
        <>
            <Container>
                <ContentLoader
                    isReady={id > 0}
                    isLoading={isLoading}
                    loaderContent={<DetailPostLoader />}
                >
                    <Columns className="has-background-white" centered>
                        <Columns.Column size={8}>
                            <Image size="square" src={url} />
                        </Columns.Column>
                        <Columns.Column className="is-paddingless is-flex" size={4}>
                            <Card>
                                <PostTitle
                                    postId={id}
                                    openPostActionMenu={openPostActionMenu}
                                    createdBy={createdBy}
                                />
                                <Card.Content>
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
                                                <FontAwesomeIcon icon={faEllipsisH} onClick={handleOpenCommentActionMenu(comment.id)} />
                                            }
                                        </Media>
                                    ))}
                                </Card.Content>
                                <Card.Footer>
                                    <Card.Footer.Item>
                                        <div className="is-full-width">
                                            <span className="has-margin-right-10">
                                                <FontAwesomeIcon className={isLiked ? 'has-text-danger' : ''} onClick={handleLike} icon={faHeart} size="2x" />
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faComment} size="2x" />
                                            </span>
                                        </div>
                                        <div className={`is-full-width ${isLikesClickable && 'has-cursor-pointer'}`} onClick={handleOpenLikesModal}>
                                            <b>{likes.length} likes</b>
                                        </div>
                                    </Card.Footer.Item>
                                    <CommentPostForm
                                        onPostComment={postComment}
                                    />
                                </Card.Footer>
                            </Card>
                        </Columns.Column>
                    </Columns>
                </ContentLoader>
            </Container>
            <CommentActionsModalContainer
                isOpen={isCommentActionMenuOpen}
                commentId={commentActionMenuId}
                onClose={handleCloseCommentActionMenu}
            />
        </>
    );
};

DetailPost.propTypes = {
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
    isLoading: PropTypes.bool,

    onLikePost: PropTypes.func,
    onDeleteLike: PropTypes.func,
    onPostComment: PropTypes.func,
    openPostActionMenu: PropTypes.func,
};

export default React.memo(DetailPost);