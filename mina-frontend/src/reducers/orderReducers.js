import {
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS
} from "../constants/orderConstants";

//here we set the default value of the state for order reducer as an empty object since we don't have anyorders yet
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            };
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                    success: true,
                    //fill order with the payload of this action
                    order: action.payload
            };
        case ORDER_CREATE_FAILURE:
            return {
                loading: false,
                    //fill error with the payload of this action
                    error: action.payload
            };
        case ORDER_CREATE_RESET:
            //just returns the default value for the state which is an empty object
            return {};
        default:
            return state;
    }
}