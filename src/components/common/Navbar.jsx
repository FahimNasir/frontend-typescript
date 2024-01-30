import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState({ name: "John Doe" });
  const navigate = useNavigate();

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
          // * Delete local storage. (Frontend State)
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
          {user ? (
            <>
              <div className="welcome">Welcome, {user.name}!</div>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            // Add login link or any other authentication logic here
            <div>Login</div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
