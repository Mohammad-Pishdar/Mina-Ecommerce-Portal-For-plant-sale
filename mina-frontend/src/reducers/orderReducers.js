import {
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAILURE,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";

//here we set the default value of the state for order reducer as an empty object since we don't have any orders yet
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

//Definig order details reducer. Here since we need to load data first we set the default value of laoding for the state to true
export const orderDetailsReducer = (
    state = {
        loading: true
    },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false, order: action.payload
            };
        case ORDER_DETAILS_FAILURE:
            return {
                loading: false, error: action.payload
            };
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            };
        case ORDER_PAY_SUCCESS:
            return {
                loading: false, success: true
            };
        case ORDER_PAY_FAILURE:
            return {
                loading: false, error: action.payload
            };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

//For this reducer we set the default value to an empty array that needs to be filled with orders
export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };