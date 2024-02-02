import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword.trim().length === 0) {
      setError("Please provide new password");
      return;
    }

    if (confirmNewPassword.trim().length === 0) {
      setError("Please provide confirm password");
      return;
    }
    if (newPassword === confirmNewPassword) {
      const response = await axios
        .post(
          "http://localhost:3000/api/users/change-password",
          {
            newPassword: newPassword,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const apiResponse = response.data;
          if (apiResponse.isError === false) {
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
            setError(message);
            return;
          }
          alert("Error Occurred while calling backend");
          return;
        });
      setNewPassword("");
      setConfirmNewPassword("");
      setError("");
    } else {
      setError("Passwords do not match.");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <div>
        <label>New Password:</label>
        <br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Confirm New Password:</label>
        <br />
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
