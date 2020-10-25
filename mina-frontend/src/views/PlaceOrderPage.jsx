import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderPage(props) {
  //we need to import shopping cart from redux store to access data stored in there
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const { shoppingCartItems } = shoppingCart;
  //again like all the other pages in checkout process we should see that the user can access this page only if they have enetered the required info on previous page which is payment method and if they don't they will be redirected to payment screen
  if (!shoppingCart.paymentMethod) {
    props.history.push("/payment");
  }
  //we then get the order object from redux store
  const createdOrder = useSelector((state) => state.order);
  //then we extract all the fields inside this object since we need all of these variables
  const { loading, success, error, order } = createdOrder;

  //Adding logic to set shipping cost
  const subtotal = Number(
    shoppingCartItems
      .reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      )
      .toFixed(2)
  );
  const shippingCost = subtotal > 100 ? 0 : 10;

  //defining the place order handler function
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    //here to dispatch what we need to our createOrder action which is to be implemented in order actions next, is to use all the fileds of shopping cart object in the state and replace shoppingCartItems with orderedItems in order for it to be used in our order model to create a new order
    dispatch(
      createOrder({
        ...shoppingCart,
        orderedItems: shoppingCart.shoppingCartItems,
      })
    );
  };

  //Now it's time to define our useEffect method. Like always it has two paraeters a function and a dependency list. Here we add success to its dependency list which means this function runs whenever success becomes true or whenever we added an order to our database successfully (we use success and order fields we have extracted earleir here in our useEffect)
  useEffect(() => {
    if (success) {
      //if the order added to database successfully then we need to redirect user to order dtails page
      props.history.push(`/order/${order._id}`);
      //then we reset the order in the state
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <main className="page">
        <section className="shopping-cart dark">
          <div className="container">
            <div className="block-heading">
              <h2>Shipping Address:</h2>
              <p>
                <strong>Name:</strong> {shoppingCart.shippingAddress.fullName}{" "}
                <br />
                <strong>Address: </strong>{" "}
                {shoppingCart.shippingAddress.address},
                {shoppingCart.shippingAddress.city},{" "}
                {shoppingCart.shippingAddress.zipCode},{" "}
                {shoppingCart.shippingAddress.state},{" "}
                {shoppingCart.shippingAddress.country}
              </p>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    {shoppingCartItems.map((cartItem) => (
                      <div className="product" key={cartItem.item}>
                        <div className="row">
                          <div className="col-md-3">
                            <img
                              className="img-fluid mx-auto d-block image"
                              src={cartItem.image}
                              alt={cartItem.name}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="info">
                              <div className="row">
                                <div className="col-md-5 product-name">
                                  <div className="product-name">
                                    <Link to={`/item/${cartItem.item}`}>
                                      {cartItem.name}
                                    </Link>
                                  </div>
                                </div>
                                <div className="col-md-4 quantity">
                                  <p>Quantity:</p>
                                  {cartItem.quantity}
                                </div>
                                <div className="col-md-3 price">
                                  <span className="ml-1">
                                    $
                                    {(
                                      cartItem.quantity * cartItem.price
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="summary">
                    <h3>Summary</h3>
                    <div className="summary-item">
                      <span className="text">Subtotal</span>
                      <span className="price">${subtotal}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Shipping</span>
                      <span className="price">${shippingCost}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Total</span>
                      <span className="price">
                        <strong>${subtotal + shippingCost}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </button>
                    {/* we use loading and error we have extracted above here to determine wheather or not to show loading and error message boxes components we created earlier */}
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
