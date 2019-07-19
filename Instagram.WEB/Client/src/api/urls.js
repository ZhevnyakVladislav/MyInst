

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
        changeFollowing_post: `${base}/profile/changeFollowing`,
    }
};

export default urls;    