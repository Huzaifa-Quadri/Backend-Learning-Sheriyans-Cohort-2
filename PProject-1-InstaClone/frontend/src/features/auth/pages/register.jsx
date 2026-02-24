import React from "react";
import { Link } from "react-router";
import "../style/form.scss";

const Register = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Register");
  };

  return (
    <div className="login-page">
      <form action="" onSubmit={submitHandler}>
        <h1>Register</h1>
        <div className="input-container">
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
        </div>
        <button type="submit" className="button primary-btn">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
