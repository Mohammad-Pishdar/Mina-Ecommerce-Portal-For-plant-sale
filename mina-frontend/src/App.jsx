import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import {
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faListAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePage from "./views/HomePage";
import ItemSpecificPage from "./views/ItemSpecificPage";
import ShoppingCartPage from "./views/ShoppingCartPage";
import { useDispatch, useSelector } from "react-redux";
import SignInPage from "./views/SignInPage";
import { signout } from "./actions/userActions";
import SignUpPage from "./views/SignUpPage";
import ShippingPage from "./views/ShippingPage";
import PaymentMethodsPage from "./views/PaymentMethodsPage";
import PlaceOrderPage from "./views/PlaceOrderPage";
import OrderDetailsPage from "./views/OrderDetailsPage";
import OrderHistoryPage from "./views/OrderHistoryPage";

function App() {
  //accessing cart items from redux
  const cartItems = useSelector((state) => state.shoppingCart);
  //object-destructure shopping cart items from cart items
  const { shoppingCartItems } = cartItems;
  //getting user info from redux store
  const userSignInInfo = useSelector((state) => state.signIn);
  //object-destructure user info from the signIn branch in state
  const { userInfo } = userSignInInfo;

  //definign dispatch to be used by our handler function
  const dispatch = useDispatch();

  //defining signout handler function
  const signoutHandler = () => {
    //dispatch user signout action
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            {/* repalcing anchors with Links form react-router-dom throughount app.js and changing href attributes to 'to's */}
            <Link className="navbar-brand" to="/">
              Mina Wholesale Plants
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/shoppingcart">
                    Cart <FontAwesomeIcon icon={faShoppingCart} />
                    {
                      /* creating a conditional rendering section here */
                      shoppingCartItems.length > 0 && (
                        <span className="shoppingCartBadge rounded-circle ml-2">
                          {shoppingCartItems.length}
                        </span>
                      )
                    }
                  </Link>
                </li>
                {/* creating a conditional rendering. If we have userInfo in state show user's name as a link else just render the sign in link */}
                {userInfo ? (
                  <div className="dropdown show">
                    <li className="nav-item">
                      <Link
                        className="nav-link text-warning dropdown-toggle"
                        to="#"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {userInfo.name}
                      </Link>
                      <div
                        className="dropdown-menu bg-dark"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <Link
                          className="nav-link bg-dark text-white"
                          to="/orderhistory"
                        >
                          Order History
                          <FontAwesomeIcon
                            className="ml-1"
                            icon={faListAlt}
                          />
                        </Link>
                        <Link
                          className="nav-link bg-dark text-white"
                          to="#signout"
                          onClick={signoutHandler}
                        >
                          Sign Out
                          <FontAwesomeIcon
                            className="ml-1"
                            icon={faSignOutAlt}
                          />
                        </Link>
                      </div>
                    </li>
                  </div>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Sign in
                      <FontAwesomeIcon icon={faSignInAlt} />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Route path="/" component={HomePage} exact></Route>
        <Route path="/item/:id" component={ItemSpecificPage}></Route>
        {/* adding another route this time for sign in page */}
        <Route path="/signin" component={SignInPage}></Route>
        <Route path="/shoppingcart/:id?" component={ShoppingCartPage}></Route>
        {/* adding another route this time for sign up page */}
        <Route path="/signup" component={SignUpPage}></Route>
        {/* new route this time for shipping page */}
        <Route path="/shipping" component={ShippingPage}></Route>
        {/* adding payment method screen  */}
        <Route path="/payment" component={PaymentMethodsPage}></Route>
        {/* adding place order screen */}
        <Route path="/placeorder" component={PlaceOrderPage}></Route>
        {/* adding order details screen */}
        <Route path="/order/:id" component={OrderDetailsPage}></Route>
        {/* adding order history screen */}
        <Route path="/orderhistory" component={OrderHistoryPage}></Route>

        <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">
              Dedicated to my Mina joon &hearts;
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
