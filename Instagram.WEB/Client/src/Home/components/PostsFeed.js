import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Container from 'react-bulma-components/lib/components/container';
import Image from 'react-bulma-components/lib/components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import CommentPostForm from '../../common/post/components/CommentPostForm';
import PostTitle from '../../common/post/components/PostTitle';

const posts = [
    {
        id: 1,
        createdBy: {
            userName: 'userName',
            imageUrl: 'imageUrl'
        },
        comments: [],
        likes: [],
        url: 'url'
    },
    {
        id: 2,
        createdBy: {
            userName: 'userName',
            imageUrl: 'imageUrl'
        },
        comments: [],
        likes: [],
        url: 'url'
    }, {
        id: 3,
        createdBy: {
            userName: 'userName',
            imageUrl: 'imageUrl'
        },
        comments: [],
        likes: [],
        url: 'url'
    },
];

const PostsFeed = ({
    posts,
    onPostComment,
    openPostActionMenu
}) => {

    const postComment = useCallback(
        (postId) => (comment) => onPostComment({
            postId: postId,
            text: comment
        }),
        [onPostComment]
    );

    return (
        <Columns centered>
            <Columns.Column size={8}>
                {posts.map(post => (
                    <Card key={post.id} className="has-margin-bottom-60">
                        <PostTitle
                            postId={post.id}
                            openPostActionMenu={openPostActionMenu}
                            createdBy={post.createdBy}
                        />
                        <Card.Content>
                            <Image size="square" src={post.url} />
                        </Card.Content>
                        <Card.Footer>
                            <Card.Footer.Item>
                                <div className="is-full-width">
                                    <span className="has-margin-right-10">
                                        <FontAwesomeIcon icon={faHeart} size="2x" />
                                        {/* <FontAwesomeIcon className={isLiked ? 'has-text-danger' : ''} onClick={handleLike} icon={faHeart} size="2x" /> */}
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faComment} size="2x" />
                                    </span>
                                </div>
                                <div className="is-full-width">
                                    <b>{post.likes.length} likes</b>
                                </div>
                            </Card.Footer.Item>
                        </Card.Footer>
                        <Card.Footer>
                            <Container>
                                <CommentPostForm
                                    onPostComment={postComment(post.id)}
                                />
                            </Container>
                        </Card.Footer>
                    </Card>
                ))}
            </Columns.Column>
        </Columns>
    );
};

PostsFeed.propTypes = {
    posts: PropTypes.array,

    openPostActionMenu: PropTypes.func,
    onPostComment: PropTypes.func
};

PostsFeed.defaultProps = {
    posts: posts
};

export default PostsFeed;