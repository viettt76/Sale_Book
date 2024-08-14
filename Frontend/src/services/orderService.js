import axios from '~/utils/axios';

export const getOrder = () => {
    return axios.get('/Order/get-order', {
        params: {
            status,
        },
    });
};
