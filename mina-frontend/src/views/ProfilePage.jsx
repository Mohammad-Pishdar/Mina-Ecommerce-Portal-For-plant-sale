import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProfilePage() {
  //getting user information from redux store
  const userInformation = useSelector((state) => state.signIn);
  const { userInfo } = userInformation;

  const detailsOfUser = useSelector((state) => state.userDetails);
  const { loading, error, user } = detailsOfUser;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDetails(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="row">
      <form onSubmit={submitHandler} className="w-50 mx-auto mb-2 mt-2">
        <div className="font-weight-bold">User Profile</div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div class="form-group">
              <label htmFor="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter Name"
                value={user.name}
              />
            </div>
            <div class="form-group">
              <label htmFor="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter Your Email"
                value={user.email}
              />
            </div>
            <div class="form-group">
              <label htmFor="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter Your Password"
              />
            </div>
            <div class="form-group">
              <label htmFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                placeholder="Confirm Your Password"
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
