import React from "react";
import "../style/form.scss";
import { Link } from "react-router";

const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Login");
  };

  return (
    <div className="login-page">
      <form action="" onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className="input-container">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
        </div>
        <button type="submit" className="button primary-btn">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
