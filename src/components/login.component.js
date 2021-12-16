import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import GoogleLogin from 'react-google-login';

const clientId = "746573539634-o65k1ji3bqt8pna8dhv0ii55qm2ukau3.apps.googleusercontent.com";

function Login({ authenticated, login, location }) {

    // Google Login Success
    const responseGoogle = (res) => {
        document.location.href = '/home'
    }

    // Google Login Fail
    const responseFail = (err) => {
        alert('Login fail with Google OAuth2.0');
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleClick = (e) => {
        e.preventDefault()
        try {
            login({ email, password });
        } catch (e) {
            alert("Failed to login");
            setEmail("");
            setPassword("");
        }
    };
  
    const { from } = location.state || { from: { pathname: "/" } };
    if (authenticated) return <Redirect to={from} />;

    return (
      <>
        <form onSubmit={handleClick}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" value={email} className="form-control" placeholder="Enter email" name="email" onChange={({ target: { value } }) => setEmail(value)}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} className="form-control" placeholder="Enter password" name="password" onChange={({ target: { value } }) => setPassword(value)}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            
            <GoogleLogin
                clientId={clientId}
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseFail}
            />

            <p className="forgot-password text-right">
                Forgot <a href="/">password?</a>
            </p>
        </form>
      </>
    );
  }
  
export default Login;