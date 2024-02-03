import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("fahimnasir1993@gmail.com");
  const [password, setPassword] = useState("123456");
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

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

    const response = await axios
      .post(
        "http://localhost:3000/api/users/signin",
        {
          emailAddress: email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const apiResponse = response.data;

        if (apiResponse.isError === false) {
          const loggedInUser = apiResponse.data;
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
          navigate("/dashboard");
        } else {
          alert(`Unsuccessful response with message: ${data.message}`);
          return;
        }
      })
      .catch((response) => {
        console.log("Error Response", response);
        const { message } = response.response.data;
        if (response.response.status === 400) {
          setValidationMessage(message);
          return;
        }
        alert("Error Occurred while calling backend");
        return;
      });
  };

  //* When to use useEffect() hook.

  //* Navigate to some other screen
  useEffect(() => {
    if (localStorage.getItem("loggedInUser") != null) {
      navigate("/dashboard");
    }

    // * Calling API here is WRONG
  });

  const disableWholeUI = () => {
    console.log("Function called!");
  };

  // *If you want to load some data on component render
  // *If you want to call a server backend api and get some data.
  // useEffect(() => {
  //   console.log("Login Screen!!");
  // }, []);

  useEffect(() => {
    //console.log("Login Screen!!");
    disableWholeUI();
    //UpdateActiveInactiveUI();
    //Call API MarkUserActive(true)
  }, [count]);

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

        {validationMessage.trim().length > 0 ? (
          <span style={{ color: "red" }}>{validationMessage}</span>
        ) : (
          ""
        )}

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
          Don't have an account? <a href="/signUp">Sign Up</a>
        </p>
        <p>Count Old: {count}</p>
        <p>Count New: {count2}</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Increment
        </button>

        <button
          onClick={() => {
            setCount2(count2 + 1);
          }}
        >
          Increment New
        </button>
      </div>
    </div>
  );
};

export default Login;
