import React, { Component } from "react";

import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}