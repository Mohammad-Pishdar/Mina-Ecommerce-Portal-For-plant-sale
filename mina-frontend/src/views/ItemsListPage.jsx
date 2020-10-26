import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, listItems } from "../actions/itemActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ITEM_CREATE_RESET } from "../constants/itemConstants";

export default function ItemsListPage(props) {
  //getting list of items from redux store
  const itemsList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemsList;

  //getting data from itemCreate in redux store
  const itemCreate = useSelector((state) => state.itemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    item: createdItem,
  } = itemCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    //check to see if we successfully created an item so we need to reset item create and redirect user to edit screen for created item
    if (successCreate) {
      dispatch({ type: ITEM_CREATE_RESET });
      props.history.push(`/item/${createdItem._id}/edit`);
    }
    dispatch(listItems());
  }, [createdItem, dispatch, props.history, successCreate]);

  const deleteHandler = (item) => {
    dispatch(deleteItem(item._id));
  };

  const createHandler = () => {
    dispatch(createItem());
  };

  return (
    <div>
        <h1 className="ml-2">Items</h1>
        <button
          type="button"
          onClick={() => {
            createHandler();
          }}
          className="btn btn-danger ml-1 mb-2"
        >
          Create New Item
        </button>
      <div className="table-responsive">
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* we're looping over items here and show them in table rows */}
              {items.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item._id}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        props.history.push(`/item/${item._id}/edit`);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteHandler(item);
                      }}
                      className="btn btn-danger ml-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
