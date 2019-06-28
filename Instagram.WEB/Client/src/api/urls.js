

const base = '/api';

const urls = {
    user: {
        signIn_post: `${base}/account/login`,
        signUp_post: `${base}/account/register`,
        logOut_post: `${base}/account/logout`,
        confirmEmail_post: `${base}/account/confirmEmail`,
        confirmResetPassword_post: `${base}/account/password/recover`,
        resetPassword_post: `${base}/account/password/reset`
    },
    profile: {
        profileData_get: `${base}/profile`
    }
};

export default urls;