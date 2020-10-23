import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
import {
    itemDetailsReducer,
    itemListReducer
} from './reducers/itemsReducers';
import {
    shoppingCartReducer
} from './reducers/shoppingCartReducers';
import {
    userSignInReducer,
    userSignUpReducer
} from './reducers/userReducers';

const initialState = {
    //defining a default value for our shopping cart and read content of the local storage to populate our shopping cart if there is something in local storage upon each refresh of the page or make the shopping cart empty if there is not
    shoppingCart: {
        shoppingCartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
    },
    //Doing exactly the same thing for user sign in info to retrieve data from local storage if there is any
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const reducer = combineReducers({
    itemList: itemListReducer,
    itemDetails: itemDetailsReducer,
    //adding shooping cart reducer here 
    shoppingCart: shoppingCartReducer,
    //adding user sign in reducer to the combined reducers
    signIn: userSignInReducer,
    //adding user sign up reducer to the combined reducers
    signUp: userSignUpReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;