import axios from 'axios';
import ApiError from '../helpers/errors/ApiError';

const BASE_URL = 'https://myinst.azurewebsites.net/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
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
        throw new ApiError(err.response);
    }
};

export default {
    get,
    post
};
