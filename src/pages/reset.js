import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showReset, setShowReset] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/user/forgot-password",
        {
          email: email,
        }
      );

      setShowReset(true);
    } catch (error) {}
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        process.env.REACT_APP_SERVER_URL + "/user/reset-password",
        {
          code: code,
          password: password,
          confirmPassword: confirmPassword,
          email: email,
        }
      );

      toast.success("Password set successfully", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]?.message, {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
    }
  };

  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          {!showReset ? (
            <form onSubmit={handleForgotPassword}>
              <span>Reset password</span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
              <h2>
                Remember Password?
                <Link to="/login"> Sign in here</Link>
              </h2>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <span>Reset password</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter code"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Set Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
              <h2>
                Remember Password?
                <Link to="/login"> Sign in here</Link>
              </h2>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
