

const base = '/api';

const urls = {
    user: {
        signIn_post: '/token',
        signUp_post: `${base}/account/register`,
        logOut_post: `${base}/account/logout`,
        confirmEmail_post: `${base}/account/confirmEmail`,
        confirmResetPassword_post: `${base}/account/password/recover`,
        resetPassword_post: `${base}/account/password/reset`,
        changePassword_post: `${base}/account/password/change`
    },
    profile: {
        loadEditProfileData_get: `${base}/profile/edit`,
        loadViewProfileData_get: `${base}/profile/view`,
        updateProfileImage_post: `${base}/profile/updateImage`,
        updateProfile_post: `${base}/profile/update`,
        loadProfileAvatar_get: `${base}/profile/avatar`,
        follow_post: `${base}/profile/follow`,
        unfollow_post: `${base}/profile/unfollow`,
        loadFollowers_post: `${base}/profile/followers`,
        loadFollowing_post: `${base}/profile/following`
    },
    posts: {
        loadProfilePosts_get: `${base}/post/profilePosts`,
        postComment_post: `${base}/post/comments/add`,
        deleteComment_post: `${base}/post/comments/delete`,
        likePost_post: `${base}/post/likes/add`,
        deleteLike_post: `${base}/post/likes/delete`,
        loadPostData_get: `${base}/post`,
        loadPostLikes_get: `${base}/post/likes`,
        loadFollowingPosts_get: `${base}/post/followingPosts`
    }
};

export default urls;    