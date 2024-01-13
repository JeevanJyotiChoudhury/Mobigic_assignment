import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to File Upload App</h2>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
};

export default HomePage;
