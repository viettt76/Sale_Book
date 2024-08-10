import axios from '~/utils/axios';

export const createBookService = (data) => {
    return axios.post('/create-book', data);
};

export const getGenresService = () => {
    return axios.get('/BookGroup/get-all');
};
