import axios from '~/utils/axios';

export const getBookPagingService = ({ pageNumber = 1, pageSize = 10, sortBy }) => {
    return axios.get('/Book/search', {
        params: {
            pageNumber,
            pageSize,
            sorting: sortBy,
        },
    });
};

export const getBookByIdService = (id) => {
    return axios.get(`/Book/get-by-id/${id}`);
};

export const searchBookByNameOrAuthor = (keyword) => {
    return axios.get('/Book/search', {
        params: {
            filter: keyword,
        },
    });
};

export const createBookService = (data) => {
    return axios.post('/Book/create', data);
};

export const updateBookService = (data) => {
    return axios.put(`/Book/update/${data?.id}`, data);
};

export const deleteBookService = (id) => {
    return axios.delete(`/Book/delete/${id}`);
};
