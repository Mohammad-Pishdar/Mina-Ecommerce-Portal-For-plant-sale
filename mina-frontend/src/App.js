import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { faShoppingCart, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePage from './views/HomePage';
import ItemSpecificPage from './views/ItemSpecificPage';

function App() {
  return (
    <BrowserRouter>
    <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      
        <a className="navbar-brand" href="/">Mina Wholesale Plants</a>
        
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/shoppingcart">Cart  <FontAwesomeIcon icon={faShoppingCart} /></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">Log in <FontAwesomeIcon icon={faSignInAlt} /></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

    <Route path="/item/:id" component={ItemSpecificPage}></Route>
    <Route path="/" component={HomePage} exact></Route>

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
