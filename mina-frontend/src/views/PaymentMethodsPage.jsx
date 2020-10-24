import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/shoppinCartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodsPage(props) {
  //defining a react hook for set payment method
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

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
      <form onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="Paypal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="creditCard"
              value="CreditCard"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
              onClick={(e) => {console.log(e.target.value); console.log(paymentMethod)}}
            ></input>
            <label htmlFor="creditCard">Credit Card</label>
          </div>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
