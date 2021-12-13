import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";

import axios from 'axios';
import GoogleLogin from 'react-google-login';

const clientId = "746573539634-o65k1ji3bqt8pna8dhv0ii55qm2ukau3.apps.googleusercontent.com";

function Login({ authenticated, login, location }) {

    console.log('login part')

    // Google Login Success
    const responseGoogle = (res) => {
        console.log(res)
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
                Forgot <a href="#">password?</a>
            </p>
        </form>
      </>
    );
  }
  
export default Login;

/*
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };
        console.log('Login')
        console.log(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        
    }

    // Google Login Success
    responseGoogle = (res) => {
        console.log(res)
        document.location.href = '/home'
    }

    // Google Login Fail
    responseFail = (err) => {
        console.error(err);
        alert('Login fail with Google OAuth2.0');
    }

    handleChange(event) {
        const inputValue = event.target.value;
        const stateField = event.target.name;
        this.setState({
            [stateField]: inputValue,
        });
        console.log(this.state);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        
        await axios.post(
            'https://67zgy6fl0h.execute-api.us-east-2.amazonaws.com/default/login',
            { email: `${email}`,
            password: `${password}` }
        ).then(res => {
            if (res.data) {
                document.location.href = '/home'
            }else{
                alert('Login fail');
                console.log('login fail')
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} value={this.state.email}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} value={this.state.password}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseFail}
                />

                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
*/