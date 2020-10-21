import React, { useState } from 'react';
//importing the link to be used in our links on the page
import Link from 'react-router-dom';

export default function SignInPage() {
    //defining submitForm function
    const submitForm = (event) => {
        //preventing the page from being refreshed when user submits 
        event.preventDefault();

    }
    //creating react hooks for setEmail and setPassword
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    {/* putting an event listener that captures the email address user types inside this input box */}
                                    <input type="email" className="form-control" placeholder="Enter your email address" required onChange={e => setEmail(e.target.value) } />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    {/* usig the same onChange function to capture the entered password */}
                                    <input type="password" className="form-control" placeholder="Enter password" required onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
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
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}