import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    if (email !== "") {
      const response = await axios
        .post(
          "http://localhost:3000/api/users/forgot-password",
          {
            emailAddress: email,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const apiResponse = response.data;

          if (apiResponse.isError === false) {
            setIsEmailVerified(true);
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
    } else {
      alert("Please enter a valid email address");
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode !== "") {
      const response = await axios
        .post(
          "http://localhost:3000/api/users/verify-forgot-pass-token",
          {
            emailAddress: email,
            token: verificationCode,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const apiResponse = response.data;

          if (apiResponse.isError === false) {
            setIsCodeVerified(true);
            alert("Verification code verified successfully!");
            return;
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
    } else {
      alert("Please enter a valid verification code");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== "" && newPassword === confirmNewPassword) {
      const response = await axios
        .post(
          "http://localhost:3000/api/users/new-password",
          {
            emailAddress: email,
            token: verificationCode,
            newPassword: newPassword,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const apiResponse = response.data;

          if (apiResponse.isError === false) {
            // Reset the component state for a fresh start
            setEmail("");
            setIsEmailVerified(false);
            setVerificationCode("");
            setNewPassword("");
            setConfirmNewPassword("");
            alert("Password changed successfully!");
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
            setNewPassword("");
            setConfirmNewPassword("");
            alert(message);
            return;
          }
          alert("Error Occurred while calling backend");
          return;
        });
    } else {
      alert("Please enter a valid password and ensure both passwords match");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!isEmailVerified && (
        <div>
          <label>Email Address:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <br />
          <button onClick={handleVerifyEmail}>Verify</button>
        </div>
      )}
      {isEmailVerified && !isCodeVerified && (
        <div>
          <p>{`A verification code has been sent over your email: ${email}`}</p>
          <br />
          <label>Verification Code:</label>
          <br />
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
      )}
      {isCodeVerified && (
        <div>
          <p>Code Verified! Enter New Password:</p>
          <br />
          <label>New Password:</label>
          <br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <label>Confirm New Password:</label>
          <br />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
