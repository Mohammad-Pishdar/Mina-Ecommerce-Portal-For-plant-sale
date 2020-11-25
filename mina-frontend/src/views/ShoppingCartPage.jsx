import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/shoppinCartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";

export default function ShoppingCartPage(props) {
  const itemId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  //getting cart from the redux store
  const shoppingCart = useSelector((state) => state.shoppingCart);
  //Now fetch cart items from the shopping cart
  const { shoppingCartItems } = shoppingCart;

  //once this screen loads run the function in useEffect to dispatch add to cart action function and pass it the grabbed item id and quantity
  const dispatch = useDispatch();
  useEffect(() => {
    if (itemId) {
      dispatch(addToCart(itemId, quantity));
    }
  }, [dispatch, itemId, quantity]);

  //defining the function to be used as an event listener function on remove button
  const removeFromCartHandler = (id) => {
    //now that we created a constant for remove from cart, defined an action and implemented a reducer, it's time to complete this function. We use dispatch to access the appropriate reducer here
    dispatch(removeFromCart(id));
  };
  //defining the function that redirects the user to the checkout page after clicking the checkout button. This function takes the user to the sign in page and after signing in will redirect them to the shipping page
  const goToCheckout = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    //listing contents of the shoping cart on screen
    <div className="container mt-5 mb-5">
      <h1>Shopping Cart</h1>
      {shoppingCartItems.length === 0 ? (
        <MessageBox>
          Your shopping cart is empty{" "}
          <Link to="/">Go back and buy some greens first!</Link>
        </MessageBox>
      ) : (
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}></th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>
              <th style={{ width: "22%" }} className="text-center">
                Subtotal
              </th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {/* rendering all the items in the shopping cart through mapping the shopping cart items array in the state */}
            {shoppingCartItems.map((cartItem) => (
              // like always setting a unique key for the first element of each item when using a loop
              <tr key={cartItem.item}>
                <td data-th="">
                  <div className="row">
                    <div className="col-sm-2 hidden-xs">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="img-responsive"
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                    <div className="col-sm-10">
                      <h4 className="nomargin ml-5">
                        <Link to={`/item/${cartItem.item}`}>
                          {cartItem.name}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </td>
                <td data-th="Price">${cartItem.price}</td>
                <td data-th="Quantity">
                  {/* setting the quantity selected as the default value of the select box and using addToCart function from the shopping cart actions to update the cart when a new value is selected */}
                  <select
                    className="form-control text-center"
                    // setting the default value to the quanitity selected before and use addToCart function from the shopping cart action file to update the quantity if user selected a diffrenet one
                    value={cartItem.quantity}
                    onChange={(e) =>
                      dispatch(
                        // since the e.target.value is a string we convert it to number here before using it as a parameter for the addToCart function
                        addToCart(cartItem.item, Number(e.target.value))
                      )
                    }
                  >
                    {/* we copy the same logic used in items details page to render options available in the drop down menu based on the available amount of that specific item in the inventory */}
                    {[...Array(cartItem.numberOfItemInInvetory).keys()].map(
                      (x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td data-th="Subtotal" className="text-center">
                  ${(cartItem.quantity * cartItem.price).toFixed(2)}
                </td>
                <td className="actions" data-th="">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCartHandler(cartItem.item)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Link className="btn btn-warning" to="/">
                  <i className="fa fa-angle-left"></i> Continue Shopping
                </Link>
              </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                {/* using reduce fucntion to execute a custom reducer funtion on each item in our shopping cart. The default value for the accumulator here should be 0 so it returns the total value of all the subtotals. We limit the results to two decimals */}
                <strong>
                  Total $
                  {shoppingCartItems
                    .reduce(
                      (accumulator, item) =>
                        accumulator + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </td>
              <td>
                <button
                  onClick={goToCheckout}
                  className="btn btn-success btn-block"
                  disabled={shoppingCartItems.length === 0}
                >
                  Checkout <i className="fa fa-angle-right"></i>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
