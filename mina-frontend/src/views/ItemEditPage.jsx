import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { getItemDetails, updateItem } from "../actions/itemActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ITEM_UPDATE_RESET } from "../constants/itemConstants";

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

  //getting data about item updates from redux store
  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: sucessUpdate,
  } = itemUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (sucessUpdate) {
      props.history.push("/itemlist");
    }
    //adding the OR statement here prevents the page to load up with previous info upon returning to it for a second time
    if (!item || item._id !== itemId || sucessUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });
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
  }, [dispatch, item, itemId, props.history, sucessUpdate]);

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

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const userInformation = useSelector((state) => state.signIn);
  const { userInfo } = userInformation;

  // const uploadFileHandler = async (e) => {
  //   console.log(userInfo.token);
  //   //we get the file from the event. Ensure to only upload the first selected file
  //   const file = e.target.files[0];
  //   //when we want to send an ajax request to upload a file we need to create an object from this class
  //   const bodyFormData = new FormData();
  //   //appending the file to that instance of formData. The key of this append function is image and the value is the content of the selected file
  //   bodyFormData.append("image", file);
  //   setLoadingUpload(true);
  //   //sending the ajax request
  //   try {
  //     const { data } = await Axios.post("/api/uploads", bodyFormData, {
  //       //adding this line helps backend to understand the request and get and uploads the file in the uploads folder
  //       "Content-Type": "multipart/form-data",
  //       //making sure only autheticated users can upload images to this server
  //       Authorization: `Bearer ${userInfo.token}`,
  //     });
  //     setImage(data);
  //     setLoadingUpload(false);
  //   } catch (error) {
  //     setErrorUpload(error.message);
  //     setLoadingUpload(false);
  //   }
  // };

  const uploadFileHandler = async (e) => {
    //we get the file from the event. Ensure to only upload the first selected file
    const file = e.target.files[0];
    //when we want to send an ajax request to upload a file we need to create an object from this class
    const bodyFormData = new FormData();
    //appending the file to that instance of formData. The key of this append function is image and the value is the content of the selected file
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    //sending the ajax request
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          //adding this line helps backend to understand the request and get and uploads the file in the uploads folder
          'Content-Type': 'multipart/form-data',
          //making sure only autheticated users can upload images to this server
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
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
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
              <label htmlFor="category">Category</label>
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
              <label htmlFor="image">Image</label>
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
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                className="form-control"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
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
              <label htmlFor="numberOfItemInInvetory">
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
              <label htmlFor="description">Description</label>
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
