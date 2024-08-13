import axios from '~/utils/axios';

export const getBookPagingService = ({ pageNumber = 1, pageSize = 10 }) => {
    return axios.get('/Book/get-all-paging', {
        params: {
            pageNumber,
            pageSize,
        },
    });
};

export const getBookByIdService = (id) => {
    return axios.get(`/Book/get-by-id/${id}`);
};

export const createBookService = (data) => {
    return axios.post('/create-book', data);
};

export const updateBookService = (data) => {
    return axios.put(`/Book/update/${data?.id}`, data);
};

export const deleteBookService = (id) => {
    return axios.delete(`/Book/delete/${id}`);
};
