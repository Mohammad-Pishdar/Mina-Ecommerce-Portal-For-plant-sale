import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { faShoppingCart, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePage from './views/HomePage';
import ItemSpecificPage from './views/ItemSpecificPage';
import ShoppingCartPage from './views/ShoppingCartPage';
import { useSelector } from 'react-redux';
import SignInPage from './views/SignInPage';

function App() {

  //accessing cart items from redux 
  const cartItems = useSelector(state => state.shoppingCart);
  //object-destructure shopping cart items from cart items
  const { shoppingCartItems } = cartItems;
  //getting user info from redux store
  const userSignInInfo = useSelector(state => state.userInfo);
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            {/* repalcing anchors with Links form react-router-dom throughount app.js and changing href attributes to 'to's */}
            <Link className="navbar-brand" to="/">Mina Wholesale Plants</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/shoppingcart">Cart  <FontAwesomeIcon icon={faShoppingCart} />
                    {/* creating a conditional rendering section here */
                      shoppingCartItems.length > 0 && (
                        <span className="shoppingCartBadge rounded-circle ml-2">
                          {shoppingCartItems.length}
                        </span>
                      )
                    }
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Log in <FontAwesomeIcon icon={faSignInAlt} /></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Route path="/" component={HomePage} exact></Route>
        <Route path="/item/:id" component={ItemSpecificPage}></Route>
        {/* adding another route this time for sign in page */}
        <Route path="/signin" component={SignInPage}></Route>
        <Route path="/shoppingcart/:id?" component={ShoppingCartPage}></Route>

        <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">Dedicated to my Mina joon  &hearts;</p>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
