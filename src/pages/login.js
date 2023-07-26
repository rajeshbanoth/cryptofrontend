import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../redux/slice/authSlice";
import { setLoading } from "../redux/slice/walletSlice";

const siteConfig = require("../siteConfig");

export default function Login() {
  const dispatch = useDispatch();
  //const [firstName,setfirstName]=useState("");
  //const [lastName,setlastName]=useState("");
  const [email, setemail] = useState("");
  //const [mobileNo,setmobile]=useState("")
  const [password, setpassword] = useState("");
  const [verifyOtp, setVerifyOtp] = useState("");
  const [success, setsuccess] = useState(false);

  const [error, seterrror] = useState("");

  // required for page routing
  let history = useHistory();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      history.push("/market");
    }
  }, [user]);

  const handlesubmit = (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/user/signin", {
        email,
        password,
      })
      .then((response) => {
        dispatch(setLoading(false));
        if (response.status === 200 && response.statusText === "OK") {
          setsuccess(true);
        }
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        seterrror(error?.response?.data?.errors[0]?.message);
      });
  };

  const confirmotp = (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/user/Login-verify-email-otp", {
        verifyOtp,
        email,
      })
      .then((response) => {
        dispatch(setLoading(false));
        if (response.status === 200 && response.statusText === "OK") {
          dispatch(addUserData(response?.data));
          history.push("/markets");
        }
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        seterrror(error?.response?.data?.errors[0]?.message);
      });
  };

  return (
    <>
      {!success ? (
        <>
          <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
              <form onSubmit={handlesubmit}>
                <span>Sign In</span>
                <div className="form-group">
                  <input
                    style={{ color: "#fff" }}
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    style={{ color: "#fff" }}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                <div className="text-right">
                  <Link to="/reset">Forgot Password?</Link>
                </div>

                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </form>
              <h2>
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </h2>
              {error === "" ? (
                <> </>
              ) : (
                <>
                  {" "}
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
              <form>
                <span>Welcome Back,Please Login</span>
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
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
