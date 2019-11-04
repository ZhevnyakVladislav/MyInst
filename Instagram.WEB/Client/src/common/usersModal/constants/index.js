import api from '../../../api';

export const UsersModalTypes = {
    Followers: 1,
    Following: 2,
    Likes: 3
};

export const UrlsByType = {
    [UsersModalTypes.Followers]: (userName) => `${api.urls.profile.loadFollowers_post}?username=${userName}`,
    [UsersModalTypes.Following]: (userName) => `${api.urls.profile.loadFollowing_post}?username=${userName}`,
    [UsersModalTypes.Likes]: (postId) => `${api.urls.posts.loadPostLikes_get}?postId=${postId}`
};

export const UsersModalTitleByType = {
    [UsersModalTypes.Followers]: 'Followers',
    [UsersModalTypes.Following]: 'Following',
    [UsersModalTypes.Likes]: 'Likes'

};