import axios from '~/utils/axios';

export const getStatistic = (type) => {
    return axios.get('/Reports', {
        params: {
            type,
        },
    });
};
