import React, { Component, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../context/ThemeContext";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUserData, updateBaseCurrency } from "../redux/slice/authSlice";
import Logo from '../assets/images/Logo.png'
export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, baseCurrency } = useSelector((state) => state.auth);

  useEffect(() => {
    let el = document.querySelector("#darkTheme");
    if (el) {
      el.addEventListener("click", function () {
        document.body.classList.toggle("dark");
      });
    }
  }, []);

  const handlelogout = async () => {
    dispatch(addUserData(null));
    history.push("/");
  };

  const updateBase = (value) => {
    dispatch(updateBaseCurrency(value));
  };

  return (
    <>
      <header style={{ background: "#FFBF00" }} className="light-bb">
        <Navbar expand="lg">
          <Link style={{ margin: 0 }} className="navbar-brand" to="/">
            <img src={Logo} style={{ height: "50px", margin: 0 }} />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav mr-auto">
              <Link to="/exchange/bitcoin" className="nav-link">
                Exchange
              </Link>
              <Link to="/markets" className="nav-link">
                Markets
              </Link>
              {/* <NavDropdown title="Dashboard">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/wallet" className="dropdown-item">
                  Wallet
                </Link>
                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>
              </NavDropdown> */}
              {/* <NavDropdown title="Others">
                <Link to="/login" className="dropdown-item">
                  Login
                </Link>
                <Link to="/signup" className="dropdown-item">
                  Sign up
                </Link>
                <Link to="/lock" className="dropdown-item">
                  Lock
                </Link>
                <Link to="/otp-number" className="dropdown-item">
                  OTP Number
                </Link>
                <Link to="/otp-verify" className="dropdown-item">
                  OTP Verify
                </Link>
                <Link to="/reset" className="dropdown-item">
                  Reset
                </Link>
                <Link to="/notfound" className="dropdown-item">
                  404
                </Link>
              </NavDropdown> */}
            </Nav>
            <Nav className="navbar-nav ml-auto">
              {user && (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {baseCurrency}
                    {baseCurrency === "USD" && "T"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => updateBase("INR")}>
                      INR
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateBase("USD")}>
                      USDT
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateBase("BTC")}>
                      BTC
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {!user && (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </>
              )}
              {user && (
                <Dropdown className="header-custom-icon">
                  {/* <ThemeConsumer>
                    {({ data, update }) => (
                      <Button variant="default" onClick={update} id="darkTheme">
                        {data.theme === "light" ? (
                          <i className="icon ion-md-moon"></i>
                        ) : (
                          <i className="icon ion-md-sunny"></i>
                        )}
                      </Button>
                    )}
                  </ThemeConsumer> */}

                  {/* <Dropdown.Toggle variant="default">
                    <i className="icon ion-md-notifications"></i>
                    <span className="circle-pulse"></span>
                  </Dropdown.Toggle> */}
                  <Dropdown.Menu>
                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                      <p className="mb-0 font-weight-medium">
                        6 New Notifications
                      </p>
                      <a href="#!" className="text-muted">
                        Clear all
                      </a>
                    </div>
                    <div className="dropdown-body">
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-md-lock"></i>
                        </div>
                        <div className="content">
                          <p>Account password change</p>
                          <p className="sub-text text-muted">5 sec ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-md-alert"></i>
                        </div>
                        <div className="content">
                          <p>Solve the security issue</p>
                          <p className="sub-text text-muted">10 min ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-logo-android"></i>
                        </div>
                        <div className="content">
                          <p>Download android app</p>
                          <p className="sub-text text-muted">1 hrs ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-logo-bitcoin"></i>
                        </div>
                        <div className="content">
                          <p>Bitcoin price is high now</p>
                          <p className="sub-text text-muted">2 hrs ago</p>
                        </div>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <div className="icon">
                          <i className="icon ion-logo-usd"></i>
                        </div>
                        <div className="content">
                          <p>Payment completed</p>
                          <p className="sub-text text-muted">4 hrs ago</p>
                        </div>
                      </a>
                    </div>
                    <div className="dropdown-footer d-flex align-items-center justify-content-center">
                      <a href="#!">View all</a>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {user && (
                <Dropdown className="header-img-icon">
                  <Dropdown.Toggle variant="default">
                    <img src={"img/avatar.svg"} alt="avatar" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="dropdown-header d-flex flex-column align-items-center">
                      <div className="figure mb-3">
                        <img src={"img/avatar.svg"} alt="" />
                      </div>
                      <div className="info text-center">
                        <p className="name font-weight-bold mb-0">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="email text-muted mb-3">{user?.email}</p>
                      </div>
                    </div>
                    <div className="dropdown-body">
                      <ul className="profile-nav">
                        <li className="nav-item">
                          <Link to="/profile" className="nav-link">
                            <i className="icon ion-md-person"></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/wallet" className="nav-link">
                            <i className="icon ion-md-wallet"></i>
                            <span>My Wallet</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/settings" className="nav-link">
                            <i className="icon ion-md-settings"></i>
                            <span>Settings</span>
                          </Link>
                        </li>
                        <li style={{ cursor: "pointer" }} className="nav-item">
                          <p className="nav-link red">
                            <i className="icon ion-md-power"></i>
                            <span onClick={handlelogout}>Log Out</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}
