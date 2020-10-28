import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSteps(props) {
  return (
    <div className="container">
      <div className="row bs-wizard" style={{ borderBottom: "0" }}>
        <div
          className={
            props.step1
              ? "col-xs-3 bs-wizard-step complete w-25"
              : "col-xs-3 bs-wizard-step disabled w-25"
          }
        >
          <div className="text-center bs-wizard-stepnum">Sign In</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          {/* Here I add descriptive texts inside Link elements using a span tag and use CSS to hide them from view. This is purely done for those who have to use a screen reader and rely on information provided on your links to understand what your link do when they clikc it so it will greately improve website accessibility. */}
          <Link to="/signin" className="bs-wizard-dot">
            <span>This will take you back to the home page</span>
          </Link>
        </div>

        <div
          className={
            props.step2
              ? "col-xs-3 bs-wizard-step complete w-25"
              : "col-xs-3 bs-wizard-step disabled w-25"
          }
        >
          <div className="text-center bs-wizard-stepnum">Shipping</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <Link to="/shipping" className="bs-wizard-dot">
            <span>This will take you back to the shipping page</span>
          </Link>
        </div>

        <div
          className={
            props.step3
              ? "col-xs-3 bs-wizard-step complete w-25"
              : "col-xs-3 bs-wizard-step disabled w-25"
          }
        >
          <div className="text-center bs-wizard-stepnum">Payment</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <Link to="/payment" className="bs-wizard-dot">
            <span>This will take you back to the payment page</span>
          </Link>
        </div>

        <div
          className={
            props.step4
              ? "col-xs-3 bs-wizard-step complete w-25"
              : "col-xs-3 bs-wizard-step disabled w-25"
          }
        >
          <div className="text-center bs-wizard-stepnum">Order</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <Link to="/placeOrder" className="bs-wizard-dot">
            <span>This will take you back to the place order page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
