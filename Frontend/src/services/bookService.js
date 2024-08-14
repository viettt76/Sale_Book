import axios from '~/utils/axios';

export const getBookPagingService = ({ pageNumber = 1, pageSize = 10, sortBy }) => {
    return axios.get('/Books/searching', {
        params: {
            pageNumber,
            pageSize,
            sorting: sortBy,
        },
    });
};

export const getBookByIdService = (id) => {
    return axios.get(`/Books/${id}`);
};

export const searchBookByNameOrAuthor = (keyword) => {
    return axios.get('/Books/searching', {
        params: {
            filter: keyword,
        },
    });
};

export const createBookService = (data) => {
    return axios.post('/Books', data);
};

export const updateBookService = (data) => {
    return axios.put(`/Books/${data?.id}`, data);
};

export const deleteBookService = (id) => {
    return axios.delete(`/Books/${id}`);
};
