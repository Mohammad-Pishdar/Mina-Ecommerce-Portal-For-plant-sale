import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemDetails } from "../actions/itemActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Ratings from "../components/Ratings";

export default function ItemSpecificPage(props) {
  const dispatch = useDispatch();
  const itemId = props.match.params.id;
  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;
  const [quantity, setQunatity] = useState(1);
  const addToShoopingCart = () => {
    props.history.push(`/shoppingcart/${itemId} ? quantity = ${quantity}`);
  };

  useEffect(() => {
    dispatch(getItemDetails(itemId));
  }, [dispatch, itemId]);

  return (
    <div className="container mainPageContainer">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className=" itemDetailsContainer container mt-5 mb-5">
          <div className="row">
            <div className="col-sm">
              <img
                style={{ width: "100vw", height: "100%" }}
                src={item.image}
                className="img-fluid largeScaleImage"
                alt={item.name}
              />
            </div>
            <div className="col-sm">
              <ul className="itemDetailsList">
                <li>
                  <h1>{item.name}</h1>
                </li>
                <li>
                  <Ratings
                    rating={item.rating}
                    reviews={item.reviews}
                  ></Ratings>
                </li>
                <li className="priceTag">Price: ${item.price}</li>
                <br />
                <li>
                  <strong>Description:</strong>
                  <p>{item.description}</p>
                </li>
                <li>
                  <div>Status:</div>
                  <div>
                    {item.numberOfItemInInvetory > 0 ? (
                      <span className="inStock"> In stock</span>
                    ) : (
                      <span className="outOfStock">Out of stok</span>
                    )}
                  </div>
                </li>
                {item.numberOfItemInInvetory > 0 && (
                  <>
                    <li>
                      <div className="form-group">
                        <div>Quantity</div>
                        <div>
                          <select
                            className="form-control"
                            value={quantity}
                            onChange={(e) => setQunatity(e.target.value)}
                          >
                            {[...Array(item.numberOfItemInInvetory).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={addToShoopingCart}
                        className="btn btn-warning"
                      >
                        Add to Cart
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2 id="reviews">Reviews</h2>
              <strong>Hans</strong>
              <div className="rating">
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
                  <i className="fa fa-star-o"></i>
                </span>
                <span></span>
              </div>
              <p>2020-10-10</p>
              <p>that is really awesome</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2>Write a customer review</h2>
              <form className="form-horizontal">
                <div className="form-group">
                  <label>Rating:</label>
                  <select className="form-control">
                    <option value="0" defaultValue>
                      Poor
                    </option>
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
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                  ></textarea>
                </div>
                <button type="button" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
