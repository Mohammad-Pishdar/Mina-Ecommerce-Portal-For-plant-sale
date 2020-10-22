import React, { useState } from "react";
//importing the link to be used in our links on the page
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../actions/userActions";
import { useEffect } from "react";

export default function SignInPage(props) {
  //getting dispatch from useDispatch hook in react redux
  const dispatch = useDispatch();

  //checking query string and if it exists split it by the question mark and take the second value (at index 1) other wise return to home page
  const redirect = props.location.search
    ? props.location.search.split("?")[1]
    : "/";

  //getting user info from redux store
  const userSignInInfo = useSelector((state) => state.signIn);
  //object-destructure user info from the signIn branch in state
  const { userInfo } = userSignInInfo;

  //defining submitForm function
  const submitForm = (event) => {
    //preventing the page from being refreshed when user submits
    event.preventDefault();
    //we dispatch sign in action when user submits form
    dispatch(signIn(email, password));
  };
  //creating react hooks for setEmail and setPassword
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
      //So if the userInfo contains a value it means sign in was successful so we need to redirect user to the appropritae page. The dependency for useEffect here is userInfo since we want it to run whenever userOnfo changes
      if(userInfo) {
        props.history.push(redirect);
      }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center h-100">
          <div className="card sign-in-card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="input-group form-group">
                  {/* putting an event listener that captures the email address user types inside this input box */}
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group form-group">
                  {/* usig the same onChange function to capture the entered password */}
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
