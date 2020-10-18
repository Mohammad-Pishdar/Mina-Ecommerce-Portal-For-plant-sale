import React from 'react';

export default function ShoppingCartPage(props) {

    const itemId = props.match.params.id;
    const quantity = props.location.search? Number(props.location.search.split('=')[1]) : 1;

    return (
        <div>
            <h1> Shopping Cart</h1>
            <p>Add to cart: Item ID: {itemId} Quantity: {quantity}</p> 
        </div>
    )
}