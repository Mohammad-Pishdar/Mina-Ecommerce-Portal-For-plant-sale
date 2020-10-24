import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/shoppinCartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodsPage(props) {
  //defining a react hook for set payment method
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  //definig dispatch
  const dispatch = useDispatch();
  //defining our submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatching save payment method
    dispatch(savePaymentMethod(paymentMethod));
    //redirecting user to place order page
    props.history.push("/placeOrder");
  };
  return (
    <div>
      {/* we set appropritae steps for each step as true values so our progress br will be updated. Here this is the third step so steps 1 through 3 should be set as true when we call the check out steps compnonet */}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
      <div>
          <div className="row">
          <h1 className="mx-auto m-2 mt-5">Payment Method</h1>
          </div>  
        </div>
      <div className="container">
        <div className="row">
          <div className="form-inline mx-auto">
            <div className="input-group radio-inline m-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)} />
              <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              <img src="/images/paypalLogo.png" alt="PayPal Logo" style={{width: "10rem", height: "5rem"}}/>
            </div>
                
            <div className="input-group radio-inline">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input type="radio"
              id="creditCards"
              value="CreditCards"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)} />
              <label htmlFor="creditCards">Credit Card</label>
                </div>
              </div>
              <img src="/images/creditCardLogo.jpg" alt="credit cards Logo" style={{width: "10rem", height: "5rem"}}/>
            </div>
          </div>
        </div>
        <div className="row">
        <button className="mx-auto btn btn-primary m-2 mb-5" type="submit">
            Continue
          </button>
        </div>   
      </div>
      </form>
    </div>
  );
}
