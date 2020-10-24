import React, { useState } from "react";
import { useDispatch} from "react-redux";
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
      props.history.push('/placeOrder');
  }
  return (
    <div>
      {/* we set appropritae steps for each step as true values so our progress br will be updated. Here this is the third step so steps 1 through 3 should be set as true when we call the check out steps compnonet */}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container w-100 mx-auto mb-5 mt-1">
        <div className="row">
          <div className="paymentCont mx-auto">
            <div className="headingWrap">
              <h3 className="headingTop text-center">Select Your Payment Method</h3>
            </div>
            <div className="row">
            <div className="paymentWrap mx-auto">
              <div
                className="btn-group paymentBtnGroup btn-group-justified"
                data-toggle="buttons"
              >
                <label className="btn paymentMethod" htmlFor="paypal">
                  <div className="method paypal"></div>
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
                <label className="btn paymentMethod" htmlFor="creditCArd">
                  <div className="method creditCArd"></div>
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
            </div>
            <div className="row">
            <div className="footerNavWrap clearfix mx-auto">
              <div className="btn btn-success pull-left btn-fyi">
                <button className="glyphicon glyphicon-chevron-left" type="submit" onClick={submitHandler}>
                  CONTINUE
                </button>
              </div>
            </div>
            </div>     
          </div>
        </div>
      </div>
    </div>
  );
}
