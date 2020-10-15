import React from 'react';
import Ratings from './Ratings';

export default function Item(props) {
    const {item} = props;
    return (
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
                  <Ratings rating={item.rating} reviews={item.reviews}></Ratings>
            </div>
          </div>
    )
}