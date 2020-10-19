import { ADD_TO_CART } from "../constants/shoppingCartConstants";

//we set the default value of state here as on object that contains an empty array needs to be filled with items in shopping cart
export const shoppingCartReducer = (state = {shoppingCartItems: []}, action) => {
    //like all the reducer functions we need a switch statement in the body to compare type of action with constants
    switch(action.type) {
        case ADD_TO_CART:
            //we get the item created in payload of the add to cart action
            const item = action.payload
            //comparing the id of the item to be added with the ids of items that may be present in the shopping cart items array above
            const itemAlreadyExists = state.shoppingCartItems.find(x => x.item === item.item);
            //now if the item added by the add to cart button exists in the shopping cart replace it with this newer version so it will be updated
            if(itemAlreadyExists) {
                return {
                    //using ...satet means that I only want to change a particular property of the state object not all of them
                    ...state,
                    //so now if the item added by the add to cart already exists in the shopping cart items replace it with the new version otherwise return the previous item
                    shoppingCartItems: state.shoppingCartItems.map(x => x.item === itemAlreadyExists.item? item: x)
                };
            } else {
                //otherwise if it does not exist in cart already add th newly added item to the cart itemsReducers
                return {
                    ...state,
                    //just concatenate cart items with the new item retured by payload above
                    shoppingCartItems: [...state.shoppingCartItems, item]
                };
            }
        default:
            return state;
    }
}