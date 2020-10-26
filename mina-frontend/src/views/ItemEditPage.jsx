import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemDetails } from "../actions/itemActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ItemEditPage(props) {
  //getting item id from the URL
  const itemId = props.match.params.id;

  //defining hooks for different fields of item creation page
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfItemInInvetory, setNumberOfItemInInvetory] = useState("");

  //getting item form redux store
  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    //adding the OR statement here prevents the page to load up with previous info upon returning to it for a second time
    if (!item || item._id !== itemId) {
      //so if the product name is null it means that it's a new item and we should load it from the template for a new item from backend
      dispatch(getItemDetails(itemId));
    } else {
      setName(item.name);
      setCategory(item.category);
      setImage(item.image);
      setPrice(item.price);
      setDescription(item.description);
      setNumberOfItemInInvetory(item.numberOfItemInInvetory);
    }
  }, [dispatch, item, itemId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateItem({
        _id: itemId,
        name,
        category,
        image,
        price,
        description,
        numberOfItemInInvetory,
      })
    );
  };

  return (
    <div className="row">
      <form onSubmit={submitHandler} className="w-50 mx-auto mb-2 mt-2">
        <div className="font-weight-bold">Edit Item {itemId}</div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="form-group">
              <label htmFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Enter Unit Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmFor="numberOfItemInInvetory">
                Number Available In Inventory
              </label>
              <input
                type="text"
                className="form-control"
                id="numberOfItemInInvetory"
                placeholder="Enter Number of Item Available"
                value={numberOfItemInInvetory}
                onChange={(e) => setNumberOfItemInInvetory(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmFor="description">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
}
