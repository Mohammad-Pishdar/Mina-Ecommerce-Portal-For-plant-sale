import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderDetailsPage(props) {
  //getting order id from the url
  const orderId = props.match.params.id;
  //defining the place order handler function
  const dispatch = useDispatch();
  //In this screen we use useEffect to dipatch order details
  useEffect(() => {
    dipatch(orderDetails(orderId));
  }, [dispatch, orderId]);

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
                      <span className="price">${shoppingCart.subTotal}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Shipping</span>
                      <span className="price">${shoppingCart.shippingCost}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Total</span>
                      <span className="price">
                        <strong>${shoppingCart.total}</strong>
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
