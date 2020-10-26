import React from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryPage(props) {
  //getting what we need from redux store
  const myOrdersList = useSelector((state) => state.myOrdersList);
  const { loading, error, orders } = myOrdersList;
  return (
    <div>
      <h1>Order History</h1>
      {/* here we first check loading */}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table class="table table-striped">
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
                <th scope="row">1</th>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.total}</td>
                <td>
                  {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                </td>
                <td>
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
                    class="btn btn-primary"
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
  );
}
