import React from "react";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";


function Logout({ logout, history }) {
  const handleClick = () => {
    logout();
    history.push("/");
  };
  return <Link className="nav-link" onClick={handleClick}>Logout</Link>;
}

export default withRouter(Logout);