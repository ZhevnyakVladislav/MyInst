import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailPost from '../components/DetailPost';
import {
    loadData,
    postComment,
    postLike,
    deleteLike,
} from 'store/post/actions';
import { dynamicDispatch } from 'helpers/dispatch';
import { openModal as openPostActionModal } from 'store/postActionsModal/actions';
import { openModal as openUsersModal } from 'store/usersModal/actions';
import PostActionModalContainer from './PostActionModalContainer';

const DetailPostContainer = ({
    id,
    postId,
    data,
    likes,
    comments,
    currentUserName,
    loadData,
    onPostComment,
    onLikePost,
    onDeleteLike,
    openPostActionModal,
    isLoading,
    openUsersModal
}) => {

    useEffect(
        () => {
            loadData(id > 0 ? id : postId);
        },
        [id, loadData, postId]
    );

    return (
        <>
            <DetailPost
                {...data}
                likes={likes}
                comments={comments}
                currentUserName={currentUserName}
                onPostComment={onPostComment}
                onLikePost={onLikePost}
                onDeleteLike={onDeleteLike}
                openPostActionMenu={openPostActionModal}
                isLoading={isLoading}
                openUsersModal={openUsersModal}
            />
            <PostActionModalContainer />
        </>
    );
};

DetailPostContainer.propTypes = {
    id: PropTypes.number,
    postId: PropTypes.number,
    data: PropTypes.object,
    currentUserName: PropTypes.string,
    isLoading: PropTypes.bool,
    likes: PropTypes.array,
    comments: PropTypes.array,

    loadData: PropTypes.func,
    onPostComment: PropTypes.func,
    onLikePost: PropTypes.func,
    onDeleteLike: PropTypes.func,
    openPostActionModal: PropTypes.func,
    openUsersModal: PropTypes.func,
};

const mapStateToProps = (state, { postId }) => {
    const id = state.post.postId > 0 ? state.post.postId : postId;

    return ({
        id: id,
        data: state.post.detailPost,
        likes: state.post.likes[id] || [],
        comments: state.post.comments[id] || [],
        currentUserName: state.user.data.userName,
        isLoading: state.post.isLoading
    });
};


const mapDispatchToProps = () => ({
    onPostComment: dynamicDispatch(postComment),
    onLikePost: dynamicDispatch(postLike),
    onDeleteLike: dynamicDispatch(deleteLike),
    loadData: dynamicDispatch(loadData),
    openPostActionModal: dynamicDispatch(openPostActionModal),
    openUsersModal: dynamicDispatch(openUsersModal),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPostContainer);