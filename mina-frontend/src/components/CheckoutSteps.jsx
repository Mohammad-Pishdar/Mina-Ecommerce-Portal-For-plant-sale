import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="container">
      <div className="row bs-wizard" style={{borderBottom:"0"}}>
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
          <a href="#" className="bs-wizard-dot"></a>
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
          <a href="#" className="bs-wizard-dot"></a>
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
          <a href="#" className="bs-wizard-dot"></a>
        </div>

        <div
          className={
            props.step4
              ? "col-xs-3 bs-wizard-step complete w-25"
              : "col-xs-3 bs-wizard-step disabled w-25"
          }
        >
          <div className="text-center bs-wizard-stepnum">Place your order</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <a href="#" className="bs-wizard-dot"></a>
        </div>
      </div>
    </div>
  );
}
