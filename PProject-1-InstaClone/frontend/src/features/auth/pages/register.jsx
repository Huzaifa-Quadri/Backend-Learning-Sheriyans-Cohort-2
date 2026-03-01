import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../style/form.scss";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, loading, user } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Register Started");

    const registerUser = await handleRegister(username, email, password);

    console.log("Register Finished, User Registered : ", registerUser);

    navigate("/");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="login-page">
      <form action="" onSubmit={submitHandler}>
        <h1>Register</h1>
        <div className="input-container">
          <input
            type="text"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            type="email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <input
            type="password"
            value={confirmPassword}
            onInput={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
          />
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
