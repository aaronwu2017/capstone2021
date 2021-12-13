import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Chat from "./components/chat";
import Login from "./components/login.component";
import Logout from "./components/logout";
import SignUp from "./components/signup.component";
import Home from "./components/home";
import AuthRoute from './components/authRoute';
import { signIn } from './components/auth';

function App() {

  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);
  
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}>Capstone 2021</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {authenticated ? (
                <li className="nav-item">
                  <Logout logout={logout}/>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login"> Login </Link>
                </li>
              )}
              
              <li className="nav-item">
                <Link className="nav-link" to={"/chat"}>Chat</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login authenticated={authenticated} login={login} {...props} />
              )}
            />
            <AuthRoute
              authenticated={authenticated}
              path="/chat"
              render={props => <Chat user={user} {...props} />}
            />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Home} />
            <AuthRoute
              authenticated={authenticated}
              path="/"
              render={props => <Home user={user} {...props} />}
            />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
