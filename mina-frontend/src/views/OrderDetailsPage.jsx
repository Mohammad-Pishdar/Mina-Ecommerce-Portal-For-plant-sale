import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderDetails } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {PayPalButton} from "react-paypal-button-v2";

export default function OrderDetailsPage(props) {
  //getting order id from the url
  const orderId = props.match.params.id;
  //defining a react hook to get the status of PayPal SDK
  const [sdkReday, setSdkReady] = useState(false);
  //fetching order details from redux store
  const detailsofTheOrder = useSelector((state) => state.orderDetails);
  //getting what we need from detailsofTheOrder defined above
  const { order, loading, error } = detailsofTheOrder;
  //defining the place order handler function
  const dispatch = useDispatch();

  //In this screen we use useEffect to dipatch order details
  useEffect(() => {
    //adding a function to add PayPal script
    const addPayPalScript = async () => {
      //sending a request to backend to get the client ID
      const { data } = await Axios.get("/api/config/paypal");
      //now data contains the PayPal client ID. Now we create an script element and set the source of this script element to paypal SDK
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      //now we set en event handler for the script. This is an onload handler which means it runs when this script is downloaded into your browser and is ready to use
      script.onload = () => {
        setSdkReady(true);
      };
      //finally we add this script to the body of the html document. This will add this script as the last child to the body of our html document
      document.body.appendChild(script);
    };
    //Now we can call the add paypal script function
    if (!order) {
      //so if the order id is not found load the order from backend
      dispatch(orderDetails(orderId));
    } else {
      if (!order.isPaid) {
        //check if we already loaded paypal is the order is not paid yet and if not call add paypal script function
        if (!window.paypal) {
          addPayPalScript();
        } else {
          //at this point we have an unpaid order and paypal is already loaded
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReday]);

  //defining the function to handle successful payment. Payment result here is the result of the payment reported back by Paypal
  const successfulPaymentHandler = (paymentResult) => {
    dispatch(orderPayment(order, paymentResult));
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <main className="page">
        <section className="shopping-cart dark">
          <div className="container">
            <div className="block-heading">
              <h2>Shipping Address:</h2>
              <p>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.zipCode},{" "}
                {order.shippingAddress.state}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Order delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not delivered yet</MessageBox>
              )}
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    {order.orderedItems.map((item) => (
                      <div className="product" key={item.item}>
                        <div className="row">
                          <div className="col-md-3">
                            <img
                              className="img-fluid mx-auto d-block image"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="info">
                              <div className="row">
                                <div className="col-md-5 product-name">
                                  <div className="product-name">
                                    <Link to={`/item/${item.item}`}>
                                      {item.name}
                                    </Link>
                                  </div>
                                </div>
                                <div className="col-md-4 quantity">
                                  <p>Quantity:</p>
                                  {item.quantity}
                                </div>
                                <div className="col-md-3 price">
                                  <span className="ml-1">
                                    ${(item.quantity * item.price).toFixed(2)}
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
                      <span className="price">${order.subTotal}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Shipping</span>
                      <span className="price">${order.shippingCost}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Total</span>
                      <span className="price">
                        <strong>${order.total}</strong>
                      </span>
                    </div>
                    {!order.isPaid && (
                      <div>
                        {!sdkReday ? (
                          <LoadingBox></LoadingBox>
                        ) : (
                          <PayPalButton
                            amount={order.total}
                            onSuccess={successfulPaymentHandler}
                          ></PayPalButton>
                        )}
                      </div>
                    )}
                    {/* <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </button> */}
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
