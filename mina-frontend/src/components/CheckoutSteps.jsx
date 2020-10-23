import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="container">
      <div className="row bs-wizard" style="border-bottom:0;">
        <div
          className={
            props.step1
              ? "col-xs-3 bs-wizard-step active"
              : "col-xs-3 bs-wizard-step disabled"
          }
        >
          <div className="text-center bs-wizard-stepnum">Sign In</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <a href="#" className="bs-wizard-dot"></a>
          <div className="bs-wizard-info text-center">
            Lorem ipsum dolor sit amet.
          </div>
        </div>

        <div
          className={
            props.step2
              ? "col-xs-3 bs-wizard-step active"
              : "col-xs-3 bs-wizard-step disabled"
          }
        >
          <div className="text-center bs-wizard-stepnum">Shipping</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <a href="#" className="bs-wizard-dot"></a>
          <div className="bs-wizard-info text-center">
            Nam mollis tristique erat vel tristique. Aliquam erat volutpat.
            Mauris et vestibulum nisi. Duis molestie nisl sed scelerisque
            vestibulum. Nam placerat tristique placerat
          </div>
        </div>

        <div
          className={
            props.step3
              ? "col-xs-3 bs-wizard-step active"
              : "col-xs-3 bs-wizard-step disabled"
          }
        >
          <div className="text-center bs-wizard-stepnum">Payment</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <a href="#" className="bs-wizard-dot"></a>
          <div className="bs-wizard-info text-center">
            Integer semper dolor ac auctor rutrum. Duis porta ipsum vitae mi
            bibendum bibendum
          </div>
        </div>

        <div
          className={
            props.step4
              ? "col-xs-3 bs-wizard-step active"
              : "col-xs-3 bs-wizard-step disabled"
          }
        >
          <div className="text-center bs-wizard-stepnum">Place your order</div>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <a href="#" className="bs-wizard-dot"></a>
          <div className="bs-wizard-info text-center">
            {" "}
            Curabitur mollis magna at blandit vestibulum. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae
          </div>
        </div>
      </div>
    </div>
  );
}
