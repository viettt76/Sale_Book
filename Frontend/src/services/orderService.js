import axios from '~/utils/axios';

export const getOrderService = ({ status, sorted = 'date' } = {}) => {
    return axios.get('/Orders/orders-of-user', {
        params: {
            // ...(status && { status }),
            sorted,
        },
    });
};

export const orderService = ({ userId, voucherId = 0, orderList }) => {
    return axios.post('/Orders/order', {
        userId,
        status: 4,
        date: new Date().toISOString(),
        voucherId,
        orderItems: orderList,
    });
};
