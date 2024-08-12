import { SAVE_USER_INFO } from '../actions/userActions';

const initialState = {
    username: null,
    email: null,
    isActive: null,
    address: null,
    phoneNumber: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                username: action.payload?.username,
                email: action.payload?.email,
                isActive: action.payload?.isActive,
                address: action.payload?.address,
                phoneNumber: action.payload?.phoneNumber,
            };
        default:
            return state;
    }
};

export default userReducer;
