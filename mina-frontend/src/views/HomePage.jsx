import React, { useEffect } from "react";
import Item from "../components/Item";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listItems } from "../actions/itemActions";

export default function HomePage() {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  return (
    <div className="container mainPageContainer">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {items.map((item) => (
                <Item key={item._id} item={item}></Item>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
