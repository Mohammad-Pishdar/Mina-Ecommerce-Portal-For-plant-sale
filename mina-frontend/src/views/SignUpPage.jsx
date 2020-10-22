import React, { useState } from "react";
//importing the link to be used in our links on the page
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/userActions";
import { useEffect } from "react";
//importing loading bix and message box components
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignUpPage(props) {
  //getting dispatch from useDispatch hook in react redux
  const dispatch = useDispatch();

  //checking query string and if it exists split it by the question mark and take the second value (at index 1) other wise return to home page
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  //getting user info from redux store
  const userSignUpInfo = useSelector((state) => state.signUp);
  //object-destructure user info from the signIn branch in state. We also take loading and info to be used to show relevant info in loading box and message box componens
  const { userInfo, loading, error } = userSignUpInfo;

  //defining submitForm function
  const submitForm = (event) => {
    //preventing the page from being refreshed when user submits
    event.preventDefault();
    if (password !== confirmedPassword) {
      alert("The password you eneterd and the one you confirmed do not match");
    } else {
      //we dispatch sign up action when user submits form
    dispatch(signUp(name, email, password));
    }
  };
  //creating react hooks for setEmail and setPassword
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  useEffect(() => {
    //So if the userInfo contains a value it means sign in was successful so we need to redirect user to the appropritae page. The dependency for useEffect here is userInfo since we want it to run whenever userOnfo changes
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center h-100">
          <div className="col offset-md-4 ">
            <div className="row">
              {/* check loading and if it's true render the loading box */}
              {loading && <LoadingBox></LoadingBox>}
              {/* we do the same thing for error */}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
            <div className="row">
              <div className="card sign-in-card" style={{height: "fit-content"}}>
                <div className="card-header">
                  <h3 className="row">Register</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={submitForm}>
                    <div className="input-group form-group">
                      {/* putting an event listener that captures the email address user types inside this input box */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name here"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
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
                    <div className="input-group form-group">
                      {/* usig the same onChange function to capture the entered password */}
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        required
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Sign Up"
                        className="btn float-right login_btn"
                      />
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center links">
                    Already have an account?<Link to="/signin">Sign In</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
