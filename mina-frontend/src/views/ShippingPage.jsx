import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingPage() {
  //setting up a hook for full name
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    //now we have to create a new action to save shipping address and dispatch it here
    dispatch(
      saveShippingAddress(fullName, address, city, zipCode, state, country)
    );
  };
  return (
    <>
      {/* we import checkout steps component here and set steps 1 and 2 to true because this is the second step of the checkout process */}
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="w-50 mx-auto mb-5 mt-1" onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
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
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="inputCity">City</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              placeholder=""
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputZip">Zip</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </>
  );
}
