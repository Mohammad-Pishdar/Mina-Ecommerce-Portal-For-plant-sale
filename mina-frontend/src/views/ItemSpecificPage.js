import React from 'react';
import Ratings from '../components/Ratings';
import data from '../data';

export default function ItemSpecificPage(props) {

	const item = data.items.find(item => item._id === props.match.params.id);
	if(!item) {
		return <div> This item is out of stock</div>
	}

    return (
        <div className=" itemDetailsContainer container mt-5 mb-5">
        <div className="row">
            <div className="col">
                <img src={item.image} className="img-fluid largeScaleImage" alt={item.name} />
            </div>
            <div className="col">
                <ul className="itemDetailsList">
                    <li>
                        <h1>{item.name}</h1>
                    </li>
                    <li>
                        <Ratings rating={item.rating} reviews={item.reviews}></Ratings>
                    </li>
                    <li className="priceTag">Price: ${item.price}</li>
					<br/>
                    <li>
                        <strong>Description:</strong>
                        <p>{item.description}</p>
                    </li>
					<li>
						<div>Status:</div>
	<div>{item.itemCount > 0 ? <span className="inStock"> In stock</span> : <span className="outOfStock">Out of stok</span>}</div>
					</li>
                    <li>
                        <div className="form-group">
                            <label for="filter">Quantity:</label>
                            <select className="form-control">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <button type="button" className="btn btn-warning">Add to Cart</button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2 id="reviews">Reviews</h2>
                <strong>Hans</strong>
                <div className="rating">
                    <span><i className="fa fa-star"></i></span><span><i className="fa fa-star"></i></span><span><i
                            className="fa fa-star"></i></span><span><i className="fa fa-star"></i></span><span><i
                            className="fa fa-star-o"></i></span><span></span>
                </div>
                <p>2020-10-10</p>
                <p>that is really awesome</p>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2>Write a customer review</h2>
                <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <label for="filter">Rating:</label>
                        <select className="form-control">
                            <option value="0" selected>Poor</option>
                            <option value="1">Fair</option>
                            <option value="2">Good</option>
                            <option value="3">Very Good</option>
                            <option value="4">Excellent</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Comments:</span>
                        </div>
                        <textarea className="form-control" aria-label="With textarea"></textarea>
                    </div>
                    <button type="button" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
    )
}