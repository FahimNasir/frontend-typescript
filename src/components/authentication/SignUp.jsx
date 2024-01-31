import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here
    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    const response = await axios
      .post("http://localhost:3000/api/users/signup", formData, {
        withCredentials: true,
      })
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

    // Proceed with form submission or other actions
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="emailAddress@gmail.com"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
