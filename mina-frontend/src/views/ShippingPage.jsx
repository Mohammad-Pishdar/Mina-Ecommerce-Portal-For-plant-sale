import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingPage() {
    //setting up a hook for full name
    const [fullName, setFullName] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
    //now we have to create a new action to save shipping address and dispatch it here
  };
  return (
    <>
      {/* we import checkout steps component here and set steps 1 and 2 to true because this is the second step of the checkout process */}
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="w-50 mx-auto mb-5 mt-1" onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <div className="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </>
  );
}
