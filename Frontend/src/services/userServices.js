import axios from '~/utils/axios';

export const loginService = ({ username, password }) => {
    return axios.post('/Login/login', {
        username,
        password,
    });
};

export const signUpService = () => {};

export const getPersonalInfoService = () => {};
