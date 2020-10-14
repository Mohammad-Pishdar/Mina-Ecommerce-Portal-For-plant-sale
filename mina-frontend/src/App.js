import React from 'react';
import data from './data';
import { faShoppingCart, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <a className="navbar-brand" href="/">Mina</a>
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

  <div className="container">

    <div className="row">

      <div className="col-lg-3">

        <h1 className="my-4">Shop Name</h1>
        <div className="list-group">
          <a href="#" className="list-group-item">Category 1</a>
          <a href="#" className="list-group-item">Category 2</a>
          <a href="#" className="list-group-item">Category 3</a>
        </div>

      </div>

      <div className="col-lg-9">

        <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide"/>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div className="row">

          {
            data.items.map(item =>(
              <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                  <a href={`/item/${item._id}`}><img className="card-img-top" src={item.image} alt={item.name}/></a>
                  <div className="card-body">
                    <h4 className="card-title">
                      <a href={`/item/${item._id}`}>{item.name}</a>
                    </h4>
                    <h5>${item.price}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                <div className="card-footer">
                <span>
                    <i className="fa fa-star"></i>
                </span>
                <span>
                    <i className="fa fa-star"></i>
                </span>
                <span>
                    <i className="fa fa-star"></i>
                </span>
                <span>
                    <i className="fa fa-star"></i>
                </span>
                <span>
                    <i className="fa fa-star-half-o"></i>
                </span>
              </div>
            </div>
          </div>
            ))
          }

        </div>

      </div>

    </div>

  </div>

  <footer className="py-5 bg-dark">
    <div className="container">
      <p className="m-0 text-center text-white">Dedicated to my Mina joon  &hearts;</p>
    </div>
  </footer>

    </div>
  );
}

export default App;
