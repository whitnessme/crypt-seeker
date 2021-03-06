import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoHost = e => {
    // e.preventDefault();
    setCredential('user3@user.io');
    setPassword('password4');
    handleSubmit();
  }

  const demoUser = e => {
    // e.preventDefault();
    setCredential('DougDemoDome');
    setPassword('password');
    handleSubmit();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="form-container">
      <form className="loginform" onSubmit={handleSubmit}>
      <h2>Welcome back!</h2>
      <h5>Let's get you to some haunts!</h5>
      {errors.length > 0 &&
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> }

          <input
            className="user-email-input"
            placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
  
          <input
            className="password-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <div className="login-buttons">
        <button onClick={demoUser} className="demo">Demo User</button>
        <button type="submit">Log In</button>
        <button onClick={demoHost} className="demo">Demo Host</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
