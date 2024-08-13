import axios from '~/utils/axios';

export const getCartService = () => {
    return axios.get('/Cart/get-cart');
};

export const addToCartService = ({ cartId, bookId, quantity }) => {
    return axios.post('/Cart/add-to-cart', {
        cartId,
        bookId,
        quantity,
    });
};
