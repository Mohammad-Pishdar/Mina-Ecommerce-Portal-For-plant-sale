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
import { shoppingCartReducer } from './reducers/shoppingCartReducers';

const initialState = {
    //defining a default value for our shopping cart and read content of the local storage to populate our shopping cart if there is something in local storage upon each refresh of the page or make the shopping cart empty if there is not
    shoppingCart:{
        shoppingCartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []
    }
};
const reducer = combineReducers({
    itemList: itemListReducer,
    itemDetails: itemDetailsReducer,
    //adding shooping cart reducer here 
    shoppingCart: shoppingCartReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;