import axios from 'axios';
import customToastify from './customToastify';
import { clearUserInfo } from '~/redux/actions';
import store from '~/redux/store';

const instance = axios.create({
    baseURL: 'https://localhost:7193/api/v1',
});

instance.defaults.withCredentials = true;

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        const customResponse = {
            data: response.data,
            status: response.status,
        };
        return customResponse;
    },
    function (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            store.dispatch(clearUserInfo());
            customToastify.info('Bạn đã hết phiên đăng nhập');
        }
        if (error?.response?.data)
            return Promise.reject({
                status: error?.response?.status,
                data: error?.response,
            });
        return Promise.reject(error);
    },
);

export default instance;
