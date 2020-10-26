import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryPage(props) {
  //getting what we need from redux store
  const myOrdersList = useSelector((state) => state.orderList);
  const { loading, error, orders } = myOrdersList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      <div className="table-responsive">
      {/* here we first check loading */}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAYMENT STATUS</th>
              <th scope="col">DELIVERY STATUS</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* we're looping over orders here and show them in table rows */}
            {orders.map((order) => (
              <tr key={order._id}>
                <th scope="row">{order._id}</th>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.total}</td>
                <td>
                  {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                </td>
                <td>
                  {" "}
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "Not Delivered Yet"}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                    className="btn btn-primary"
                  >
                    Details
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
