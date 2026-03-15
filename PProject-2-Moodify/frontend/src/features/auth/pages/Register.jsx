import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import "../style/Register.scss";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
const Register = () => {
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({ username, email, password });
      navigate("/");
    } catch (error) {
      // Error is handled in useAuth
    }
  };
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <FormGroup
            label="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormGroup
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
