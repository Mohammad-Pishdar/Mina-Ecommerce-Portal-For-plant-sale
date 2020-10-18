import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
import { itemListReducer } from './reducers/itemsReducers';

const initialState = {};
const reducer = combineReducers({
    itemList: itemListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;