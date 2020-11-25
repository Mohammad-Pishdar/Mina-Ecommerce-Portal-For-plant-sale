import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/shoppinCartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingPage(props) {
  //accessing user info in state
  const signIn = useSelector((state) => state.signIn);
  const { userInfo } = signIn;
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const {shoppingCartItems} = shoppingCart;
  const {shippingAddress} = shoppingCart;

  //we use this information to send users back to sign in screen if they're not already signed in
  if(!userInfo) {
      props.history.push('/signin');
  } else
  if(shoppingCartItems.length === 0) {
      props.history.push('/');
  }
  //setting up a hook for full name and other details for shipping. We fill the default state with values of shipping address in state so if the user refreshes the page they won't lose the info they have lareday entered. In order for this to work we should also we must also set the initial state of shopping cart shipping address to check the local storage and retrieve shipping address data if exists or send back an empty object otherwise in our store.js file
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [state, setState] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);


  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    //now we have to create a new action to save shipping address and dispatch it here
    dispatch(
      //we wrap the parameters here inside curly braces so we can later pass it as a single object called data in its related action and reducer
      saveShippingAddress({ fullName, address, city, zipCode, state, country })
    );
    //Now that we dispatched shipping address it's time to redirect user to payment screen
    props.history.push("/payment");
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
