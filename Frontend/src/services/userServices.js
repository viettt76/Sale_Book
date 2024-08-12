import axios from '~/utils/axios';

export const loginService = ({ username, password }) => {
    return axios.post('/Login/login', {
        userName: username,
        password: password,
    });
};

export const signUpService = ({ username, email, password, address, phoneNumber }) => {
    return axios.post('/Login/register', { username, email, password, address, phoneNumber });
};

export const getPersonalInfoService = () => {
    return axios.get('/User/get-user-info');
};
