import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderDetails } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderDetailsPage(props) {
  //getting order id from the url
  const orderId = props.match.params.id;
  //fetching order details from redux store
  const detailsofTheOrder = useSelector((state) => state.orderDetails);
  //getting what we need from detailsofTheOrder defined above
  const { order, loading, order } = detailsofTheOrder;
  //defining the place order handler function
  const dispatch = useDispatch();
  //In this screen we use useEffect to dipatch order details
  useEffect(() => {
    dipatch(orderDetails(orderId));
  }, [dispatch, orderId]);

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
