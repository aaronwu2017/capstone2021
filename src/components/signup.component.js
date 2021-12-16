import React, { Component } from "react";

import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
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
            'https://z81ylm75gg.execute-api.us-east-2.amazonaws.com/default/register',
            { firstName: `${firstName}`, 
            lastName: `${lastName}`,
            email: `${email}`,
            password: `${password}` }
        ).then(data => {
            console.log(data)
            document.location.href = '/'
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" name="firstName" onChange={this.handleChange} value={this.state.firstName}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="lastName" onChange={this.handleChange} value={this.state.lastName}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} value={this.state.email}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} value={this.state.password}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
            </form>
        );
    }
}