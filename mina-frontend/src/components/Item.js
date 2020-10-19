import React from 'react';
import Ratings from './Ratings';
import {Link} from 'react-router-dom';

export default function Item(props) {
    const {item} = props;
    return (
            <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                  {/* replacing anchor with a Link from react-router dom because in a single page app like this clicking anchors refreshes the page that we do not want. We should also change the href attribute in Link to a 'to'  */}
                  <Link to={`/item/${item._id}`}><img className="card-img-top" src={item.image} alt={item.name}/></Link>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to={`/item/${item._id}`}>{item.name}</Link>
                    </h4>
                    <h5>${item.price}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <Ratings rating={item.rating} reviews={item.reviews}></Ratings>
            </div>
          </div>
    )
}