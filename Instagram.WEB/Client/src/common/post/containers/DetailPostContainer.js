import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailPost from '../components/DetailPost';
import {
    loadData,
    postComment,
    postLike,
    deleteLike,
} from '../../../store/detailPost/actions';
import { dynamicDispatch } from '../../../helpers/dispatch';
import { openModal as openPostActionModal } from '../../../store/postActionsModal/actions';
import PostActionModalContainer from './PostActionModalContainer';

const DetailPostContainer = ({
    id,
    postId,
    data,
    currentUserName,
    loadData,
    onPostComment,
    onLikePost,
    onDeleteLike,
    openPostActionModal,
    isLoading
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
                currentUserName={currentUserName}
                onPostComment={onPostComment}
                onLikePost={onLikePost}
                onDeleteLike={onDeleteLike}
                openPostActionMenu={openPostActionModal}
                isLoading={isLoading}
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

    loadData: PropTypes.func,
    onPostComment: PropTypes.func,
    onLikePost: PropTypes.func,
    onDeleteLike: PropTypes.func,
    openPostActionModal: PropTypes.func
};

const mapStateToProps = state => ({
    id: state.detailPost.postId,
    data: state.detailPost.data,
    currentUserName: state.user.data.userName,
    isLoading: state.detailPost.isLoading
});

const mapDispatchToProps = () => ({
    loadData: dynamicDispatch(loadData),
    onPostComment: dynamicDispatch(postComment),
    onLikePost: dynamicDispatch(postLike),
    onDeleteLike: dynamicDispatch(deleteLike),
    openPostActionModal: dynamicDispatch(openPostActionModal)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPostContainer);