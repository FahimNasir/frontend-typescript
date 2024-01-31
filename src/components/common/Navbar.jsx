import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedInUser =
    localStorage.getItem("loggedInUser") != null
      ? JSON.parse(localStorage.getItem("loggedInUser"))
      : null;

  const handleLogout = async () => {
    const response = await axios
      .post(
        "http://localhost:3000/api/users/signout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const { data } = response.data;
        if (!data.isError) {
          localStorage.removeItem("loggedInUser");
          navigate("/login");
        } else {
          alert(`Unsuccessful response with message: ${data.message}`);
          return;
        }
      })
      .catch((response) => {
        console.log("Error Response", response);
        const { message } = response.response.data;
        if (response.response.status === 400) {
          alert(message);
          return;
        }
        alert("Error Occurred while calling backend");
        return;
      });
  };

  return (
    <nav>
      <div className="navbar">
        <div className="brand">Authentication App</div>
        <div className="menu">
          <div className="welcome">Welcome, {loggedInUser?.fullName}!</div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
