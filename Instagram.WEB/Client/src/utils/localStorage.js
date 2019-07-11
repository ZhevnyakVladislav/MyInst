import { setAuthorizationHeader } from '../api/api';

export const getAccessToken = () => {
    const token = localStorage.jwt || '';

    return token;
};

export const setAccessToken = (token = '') => {
    setAuthorizationHeader(token);
    localStorage.setItem('jwt', token);
};
