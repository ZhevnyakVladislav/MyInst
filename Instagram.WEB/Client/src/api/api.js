import axios from 'axios';

const BASE_URL = '//myinstagram.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //   common: {
    //     Authorization: getAccessToken()
    //   }
    // }
});

const get = async (path, params) => {
    try {
        const response = await axiosInstance.get(path, { params });
        return response;
    } catch (err) {
        throw new Error();
    }
};

const post = async (path, body, params) => {
    try {
        const response = await axiosInstance.post(path, body, { params });
        return response;
    } catch (err) {
        throw new Error();
    }
};

export default {
    get,
    post
};