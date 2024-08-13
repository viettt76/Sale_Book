import axios from '~/utils/axios';

export const getAllGenresService = () => {
    return axios.get('/BookGroup/get-all');
};

export const getGenrePagingService = ({ pageNumber = 1, pageSize = 10 }) => {
    return axios.get('/BookGroup/get-all-paging', {
        params: { pageNumber, pageSize },
    });
};

export const createGenreService = (data) => {
    return axios.post('/BookGroup/create', data);
};

export const updateGenreService = (data) => {
    return axios.put(`/BookGroup/update/${data?.id}`, data);
};

export const deleteGenreService = (id) => {
    return axios.delete(`/BookGroup/delete/${id}`);
};
