import React, { useEffect } from 'react';
import { addToCart } from '../actions/shoppinCartActions';
import {useDispatch} from 'react-redux';

export default function ShoppingCartPage(props) {

    const itemId = props.match.params.id;
    const quantity = props.location.search? Number(props.location.search.split('=')[1]) : 1;

    //once this screen loads run the function in useEffect to dispatch add to cart action function and pass it the grabbed item id and quantity  
    const dispatch = useDispatch();
    useEffect(() => {
        if (itemId) {
            dispatch(addToCart(itemId, quantity));
        }
    }, [dispatch, itemId, quantity])

    return (
        <div>
            <h1> Shopping Cart</h1>
            <p>Add to cart: Item ID: {itemId} Quantity: {quantity}</p> 
        </div>
    )
}