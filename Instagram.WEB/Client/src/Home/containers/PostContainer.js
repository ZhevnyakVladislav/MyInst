import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Card from 'react-bulma-components/lib/components/card';
import Image from 'react-bulma-components/lib/components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { dynamicDispatch } from 'helpers/dispatch';
import {
    postLike,
    deleteLike,
    postComment
} from 'store/post/actions';
import { openModal as openPostActionModal } from 'store/postActionsModal/actions';
import CommentPostForm from 'common/post/components/CommentPostForm';
import PostTitle from 'common/post/components/PostTitle';
import { Link } from 'react-router-dom';

const PostContainer = ({
    id,
    createdBy,
    url,
    likes,
    comments,
    currentUserName,
    onLikePost,
    onDeleteLike,
    openPostActionModal,
    onCommentPost
}) => {

    const isLiked = useMemo(() => likes.some(l => l.createdBy.userName === currentUserName), [currentUserName, likes]);
    const handleLike = useCallback(
        () => isLiked ? onDeleteLike(id) : onLikePost(id),
        [id, isLiked, onDeleteLike, onLikePost]
    );

    const handleCommentPost = (comment) => onCommentPost({
        postId: id,
        text: comment
    });

    const lastCommets = useMemo(() => comments.slice(-2), [comments]);

    return (
        <Card key={id} className="has-margin-bottom-60">
            <PostTitle
                postId={id}
                openPostActionMenu={openPostActionModal}
                createdBy={createdBy}
            />
            <Image size="square" src={url} />
            <Card.Footer>
                <Card.Footer.Item>
                    <div className="is-full-width">
                        <span className="has-margin-right-10">
                            <FontAwesomeIcon className={isLiked ? 'has-text-danger' : ''} onClick={handleLike} icon={faHeart} size="2x" />
                        </span>
                        <span>
                            <Link to={`/posts/${id}`}>
                                <FontAwesomeIcon icon={faComment} size="2x" />
                            </Link>
                        </span>
                    </div>
                    <div className="is-full-width">
                        <b>{likes.length} likes</b>
                    </div>
                    <div className="is-full-width">
                        <p>
                            <Link to={`/posts/${id}`}>
                                View all {comments.length} comments
                            </Link>
                        </p>
                    </div>
                    <div className="is-full-width">
                        {lastCommets.map(p =>
                            <p key={p.id}><b>{p.createdBy.userName}</b> {p.text}</p>
                        )}
                    </div>
                </Card.Footer.Item>
            </Card.Footer>
            <Card.Footer>
                <Container>
                    <CommentPostForm
                        onPostComment={handleCommentPost}
                    />
                </Container>
            </Card.Footer>
        </Card>
    );
};

PostContainer.propTypes = {
    id: PropTypes.number,
    createdBy: PropTypes.object,
    url: PropTypes.string,
    likes: PropTypes.array,
    comments: PropTypes.array,
    currentUserName: PropTypes.string,

    openPostActionMenu: PropTypes.func,
    onLikePost: PropTypes.func,
    onDeleteLike: PropTypes.func,
    onCommentPost: PropTypes.func,
    openPostActionModal: PropTypes.func,
};

const mapStateToProps = (state, { id }) => ({
    comments: state.post.comments[id] || [],
    likes: state.post.likes[id] || [],
    currentUserName: state.user.data.userName,
});

const mapDispatchToProps = () => ({
    onLikePost: dynamicDispatch(postLike),
    onDeleteLike: dynamicDispatch(deleteLike),
    openPostActionModal: dynamicDispatch(openPostActionModal),
    onCommentPost: dynamicDispatch(postComment)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);