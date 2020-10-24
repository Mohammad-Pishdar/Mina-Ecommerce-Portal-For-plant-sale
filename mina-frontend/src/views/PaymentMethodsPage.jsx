import React, { useState } from "react";
import { useDispatch} from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodsPage(props) {
  //defining a react hook for set payment method
  const [paymentMethod, setpaymentMethod] = useState("PayPal");

  //definig dispatch
  const dispatch = useDispatch();
  //defining our submit handler
  const submitHandler = (e) => {
      e.preventDefault();
      //dispatching save payment method
      dispatch(savePaymentMethod(paymentMethod));
      //redirecting user to place order page
      props.history.push('/placeOrder');
  }
  return (
    <div>
      {/* we set appropritae steps for each step as true values so our progress br will be updated. Here this is the third step so steps 1 through 3 should be set as true when we call the check out steps compnonet */}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div class="container">
        <div class="row">
          <div class="paymentCont">
            <div class="headingWrap">
              <h3 class="headingTop text-center">Select Your Payment Method</h3>
              <p class="text-center">
                Created with bootsrap button and using radio button
              </p>
            </div>
            <div class="paymentWrap">
              <div
                class="btn-group paymentBtnGroup btn-group-justified"
                data-toggle="buttons"
              >
                <label class="btn paymentMethod" htmlFor="paypal">
                  <div class="method paypal" onClick={clickHandler}></div>
                  {/* by marking this input field as checked we make it the default option to pay */}
                  <input
                    type="radio"
                    id="paypal"
                    value="PayPal"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </label>
                <label class="btn paymentMethod" htmlFor="creditCArd">
                  <div class="method creditCArd" onClick={clickHandler}></div>
                  {/* by marking this input field as checked we make it the default option to pay */}
                  <input
                    type="radio"
                    id="creditCArd"
                    value="CreditCArd"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div class="footerNavWrap clearfix">
              <div class="btn btn-success pull-left btn-fyi">
                <button class="glyphicon glyphicon-chevron-left" type="submit" onSubmit={submitHandler}>
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
