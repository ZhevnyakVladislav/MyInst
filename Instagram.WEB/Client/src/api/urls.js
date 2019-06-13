

const base = '/api';

const urls = {
    user: {
        signIn_post: `${base}/account/login`,
        signUp_post: `${base}/account/register`,
        logOut_post: `${base}/account/logout`,
        userData_get: `${base}/account/user`
    },
    profile: {
        profileData_get: `${base}/profile`
    }
};

export default urls;