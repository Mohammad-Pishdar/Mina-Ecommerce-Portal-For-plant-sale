import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
import {
    ItemCreateReducer,
    itemDeleteReducer,
    itemDetailsReducer,
    itemListReducer,
    itemUpdateReducer
} from './reducers/itemsReducers';
import { orderDetailsReducer, orderListReducer, orderPayReducer, orderReducer } from './reducers/orderReducers';
import {
    shoppingCartReducer
} from './reducers/shoppingCartReducers';
import {
    userDetailsReducer,
    userSignInReducer,
    userSignUpReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';

const initialState = {
    //defining a default value for our shopping cart and read content of the local storage to populate our shopping cart if there is something in local storage upon each refresh of the page or make the shopping cart empty if there is not
    shoppingCart: {
        shoppingCartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        //here we set the default state for payment method in our shopping cart to PayPal
        // paymentMethod: 'PayPal',
    },
    //Doing exactly the same thing for user sign in info to retrieve data from local storage if there is any
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const reducer = combineReducers({
    itemList: itemListReducer,
    itemDetails: itemDetailsReducer,
    //adding shopping cart reducer here 
    shoppingCart: shoppingCartReducer,
    //adding user sign in reducer to the combine reducers
    signIn: userSignInReducer,
    //adding user sign up reducer to the combine reducers
    signUp: userSignUpReducer,
    //adding order reducer to the combine reducers
    order: orderReducer,
    //adding order details reducer to the combine reducers
    orderDetails: orderDetailsReducer,
    //adding order payment reducer to the combine reducers
    orderPay: orderPayReducer,
    //adding order list reducer to the combine reducers
    orderList: orderListReducer,
    //adding user details reducer to the combine reducers
    userDetails: userDetailsReducer,
    //adding user update profile reducer to the combine reducers
    userUpdateProfile: userUpdateProfileReducer,
    //adding item create reducer to the combine reducers
    itemCreate: ItemCreateReducer,
    //adding item update reducer to the combine reducers
    itemUpdate: itemUpdateReducer,
    //adding item delete reducer to the combine reducers
    itemDelete: itemDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;