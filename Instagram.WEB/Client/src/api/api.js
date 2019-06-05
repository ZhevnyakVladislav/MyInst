import axios from 'axios';
import ApiError from '../helpers/errors/ApiError';

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
        throw new ApiError(err.response);
    }
};

const post = async (path, body, params) => {
    try {
        const response = await axiosInstance.post(path, body, { params });
        return response;
    } catch (err) {
        throw new ApiError(err.response.data);
    }
};

export default {
    get,
    post
};