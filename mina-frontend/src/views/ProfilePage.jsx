import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, userDetails } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfilePage() {
  //since we need to update databse with what user puts here in input fields we have to define state for them
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  //getting user information from redux store
  const userInformation = useSelector((state) => state.signIn);
  const { userInfo } = userInformation;

  const detailsOfUser = useSelector((state) => state.userDetails);
  const { loading, error, user } = detailsOfUser;

  //getting user update profile information from redux store. We rename error and update deconstructed here from state to avoid confusing vscode with similar name since we object decconstructed variables with the same names before in this file
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: sucessUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  //here we add user as a dependency to useEffect so when user changes from null to an object from backend (when we send ajax request to backend from our userDetails action) useEffect runs again. So if the user is null it will run and fill the input fields with data from backend else if the user is already filled it will fill name and email with data from backend
  useEffect(() => {
    if (!user) {
      //we need to reset profile update when we open profile screen for the second time
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(userDetails(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      alert("Your password and confirmed password should match");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

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
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {sucessUpdate && (
              <MessageBox variant="success">Profile Updated</MessageBox>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                onChange={(e) => setConfirmedPassword(e.target.value)}
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
