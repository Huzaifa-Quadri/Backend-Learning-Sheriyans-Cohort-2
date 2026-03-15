import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ username, password });
    } catch (error) {
      // Error is handled in useAuth
    }
    navigate("/");
  };

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/* <div className="form-group">
          <h3>Username : </h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div> */}
          <FormGroup
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {/* <FormGroup
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@mail.com"
          /> */}
          <FormGroup
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
};

export default Login;
