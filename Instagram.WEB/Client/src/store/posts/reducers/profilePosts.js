import types from '../types';
import { handleActions } from 'redux-actions';

const createInitialState = () => [];

export default handleActions({
    [types.LOAD_PROFILE_POSTS_SUCCESS]: (state, { payload }) => payload.map(p => ({
        id: p.id,
        url: p.url,
        description: p.description,
        createdBy: p.createdBy,
        createdAt: p.createdAt,
        commentsCount: p.comments && p.comments.length || 0,
        likesCount: p.likes && p.likes.length || 0
    }))
}, createInitialState());