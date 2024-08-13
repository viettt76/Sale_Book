import { ADD_BOOKS, CLEAR_CART } from '../actions/cartAction';

const initialState = [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOKS:
            return [...action.payload, ...state];
        case CLEAR_CART:
            return [];
        default:
            return state;
    }
};

export default cartReducer;
