import React, { useState } from 'react';
//importing the link to be used in our links on the page
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { signIn } from '../actions/userActions';


export default function SignInPage() {
    //defining submitForm function
    const submitForm = (event) => {
        //preventing the page from being refreshed when user submits 
        event.preventDefault();
        //we dispatch sign in action when user submits form
        dispatch(signIn(email, password));

    }
    //creating react hooks for setEmail and setPassword
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //getting dispatch from useDispatch hook in react redux 
    const dispatch = useDispatch();
    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <div className="input-group form-group">
                                    {/* putting an event listener that captures the email address user types inside this input box */}
                                    <input type="email" className="form-control" placeholder="Enter your email address" required onChange={e => setEmail(e.target.value) } />

                                </div>
                                <div className="input-group form-group">
                                    {/* usig the same onChange function to capture the entered password */}
                                    <input type="password" className="form-control" placeholder="Enter password" required onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn float-right login_btn" />
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
    )
}