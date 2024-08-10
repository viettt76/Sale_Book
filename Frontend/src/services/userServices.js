import axios from '~/utils/axios';

export const loginService = ({ username, password }) => {
    var res = axios.post('/Login/login', {
        userName: username,
        password: password,
    });

    return res;
};

export const signUpService = () => {};

export const getPersonalInfoService = () => {};
