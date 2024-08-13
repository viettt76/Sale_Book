import axios from '~/utils/axios';

export const getAllAuthorsService = () => {
    return axios.get('/Author/get-all');
};

export const getAuthorPagingService = ({ pageNumber = 1, pageSize = 10 }) => {
    return axios.get('/Author/get-all-paging', {
        params: { pageNumber, pageSize },
    });
};

export const createAuthorService = (data) => {
    return axios.post('/Author/create', data);
};

export const updateAuthorService = (data) => {
    return axios.put(`/Author/update/${data?.id}`, data);
};

export const deleteAuthorService = (id) => {
    return axios.delete(`/Author/delete/${id}`);
};
