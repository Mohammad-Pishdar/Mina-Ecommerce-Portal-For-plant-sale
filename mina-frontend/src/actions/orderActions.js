import {
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS
} from "../constants/orderConstants";
import Axios from "axios";
import {
    EMPTY_CART
} from "../constants/shoppingCartConstants";



export const createOrder = (order) => async (dispatch, getState) => {
    //first we need to dispatch an order create request that is being sent as an ajax request
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    });
    try {
        //getting userInfo from redux store. Here getState returens the whole redux store for us and we choose what we want to get here from the whole redux store (which is the state) by object destructuring them.
        const {
            signIn: {
                userInfo
            }
        } = getState();
        //second parameter in this ajax request is to request the ayload which is the order and the third parameter is options and in the oprtions we're setiing the headers and fill the Authorization filed with the token that comes from userInfo
        const {
            data
        } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        //Now that we have data that contains the order we can dispatch ORDER_CREATE_SUCCESS and set it's payload to the data we have just recieved
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        });
        //after adding the order successfully to our database it's time to remove items from the shopping cart
        dispatch({
            type: EMPTY_CART
        });
        //and also clean the local storage
        localStorage.removeItem('cartItems');

    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

export const orderDetails = (orderId) => async (dispatch, getState) => {
    //first we dispatch order details request so first we need to define it in our order constants file
    dispatch({
        type: ORDER_DETAILS_REQUEST,
        payload: orderId
    });
    //we also get user info from state
    const {
        signIn: {
            userInfo
        }
    } = getState();
    //now we can send our ajax request
    try {
        const {
            data
        } = await Axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        //it's time to dispatch the data 
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (err) {
        const message = err.response && err.response.data.message ? err.response.data.message : err.message;
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: message
        });
    }
}