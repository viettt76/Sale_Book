import axios from '~/utils/axios';

export const getAllAuthorService = () => {
    return axios.get('/Author/get-all');
};
