import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (email.trim().length === 0) {
      alert("Please enter email address");
      return;
    }

    if (password.trim().length === 0) {
      alert("Please enter password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signin",
        {
          emailAddress: email,
          password,
        }
      );
      console.log("API Response", response);
    } catch (error) {
      console.error("Error occurred while calling API", error);
      alert("Error Occurred while login");
      return;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <br />
      <form>
        <label>Email Address:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <br />
        <br />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      <div>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
