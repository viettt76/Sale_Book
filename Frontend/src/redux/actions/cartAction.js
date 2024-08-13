export const ADD_BOOKS = 'ADD_BOOKS';
export const CLEAR_CART = 'CLEAR_CART';

export const addBooksToCart = (payload) => {
    return {
        type: ADD_BOOKS,
        payload,
    };
};

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};
