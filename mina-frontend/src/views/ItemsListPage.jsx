import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listItems } from "../actions/itemActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ItemsListPage(props) {
  //getting list of items from redux store
  const itemsList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemsList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  const deleteHandler = () => {};

  return (
    <div>
      <h1>Items</h1>
      <div className="table-responsive">
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
