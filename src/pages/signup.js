import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { addUserData } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slice/walletSlice";
const siteConfig = require("../siteConfig");

export default function Signup() {
  const dispatch = useDispatch();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mobileNo, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [termConditions, setTermConditions] = useState(false);

  const [verifyOtp, setVerifyOtp] = useState("");
  const [success, setsuccess] = useState(false);

  const [error, seterror] = useState("");
  let history = useHistory();

  const register = (e) => {
    e.preventDefault();
    seterror("");

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      seterror("Please fill required fields");
      return;
    }

    if (!termConditions) {
      seterror("Please accept the terms and conditions");
      return;
    }

    if (password !== confirmpassword) {
      seterror("Password don't match");
      return;
    }

    dispatch(setLoading(true));
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/user/signup", {
        firstName,
        lastName,
        email,
        mobileNo,
        password,
      })
      .then((response) => {
        console.log(response);
        dispatch(setLoading(false));
        if (response.status === 201) {
          setsuccess(true);
        }
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        seterror(error.response.data.errors[0].message);
      });
  };

  const confirmotp = (e) => {
    e.preventDefault();

    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/user/signup-verify-email-otp",
        {
          verifyOtp,
          email,
        }
      )
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          dispatch(addUserData(response.data));
          history.push("/markets");
        }
      })
      .catch(function (error) {
        seterror(error.response.data.errors[0].message);
      });
  };

  return (
    <>
      {!success ? (
        <>
          <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
              <form>
                <span>Create Account</span>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      style={{ color: "#fff" }}
                      className="form-control"
                      id="firstname"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => {
                        setfirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      style={{ color: "#fff" }}
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Last Name"
                      onChange={(e) => {
                        setlastName(e.target.value);
                      }}
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    style={{ color: "#fff" }}
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <input
                    style={{ color: "#fff" }}
                    className="form-control"
                    placeholder="Mobile"
                    required
                    value={mobileNo}
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      style={{ color: "#fff" }}
                      className="form-control"
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      style={{ color: "#fff" }}
                      className="form-control"
                      id="confirmpass"
                      placeholder="confirm password"
                      type="password"
                      value={confirmpassword}
                      onChange={(e) => {
                        setconfirmpassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="form-checkbox"
                    required
                    onClick={(e) => setTermConditions(!termConditions)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="form-checkbox"
                  >
                    I agree to the{" "}
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={register}
                >
                  Create Account
                </button>
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </form>
              <h2>
                Already have an account?
                <Link to="/login"> Sign in here</Link>
              </h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
              <form>
                <span>Welcome Back, Please Login</span>
                <div className="form-group">
                  <input
                    style={{ color: "#fff" }}
                    className="form-control"
                    placeholder="Verify Email Otp"
                    required
                    value={verifyOtp}
                    onChange={(e) => {
                      setVerifyOtp(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={confirmotp}
                >
                  confirm
                </button>
              </form>

              {error === "" ? (
                <> </>
              ) : (
                <>
                  {" "}
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </>
              )}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}
