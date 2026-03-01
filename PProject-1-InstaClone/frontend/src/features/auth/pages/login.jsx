import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Login started");

    const loggedInUser = await handleLogin(username, password);

    console.log("Login finished, User Logged in : ", loggedInUser);

    navigate("/");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="login-page">
      <form action="" onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className="input-container">
          <input
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
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
