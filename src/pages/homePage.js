import React from "react";

import MarketsList from "../components/MarketsList";

const HomePage = () => {
  return (
    <div>
      {/* <header className="dark-bb">
        <nav
          className="navbar navbar-expand-lg"
          style="background-color: goldenrod;"
        >
          <a
            className="navbar-brand"
            href="landing-page-dark.html"
            style="color: black;"
          >
            <b>Pyxcrypto</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#headerMenu"
            aria-controls="headerMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="icon ion-md-menu"></i>
          </button>

          <div className="collapse navbar-collapse" id="headerMenu">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a
                  className="nav-link link"
                  href="exchange-dark.html"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: black"
                >
                  <b>Exchange</b>
                </a>
              </li>
              <li className="nav-item active">
                <a
                  className="nav-link link"
                  href="markets-dark.html"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: black"
                >
                  <b>Markets</b>
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: black;"
                >
                  <b>Others</b>
                </a>
                <div className="dropdown-menu">
                  <a
                    className="dropdown-item"
                    href="#"
                    style="color: goldenrod;"
                  >
                    About Us
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    style="color: goldenrod;"
                  >
                    Contact Us
                  </a>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <a href="signin-dark.html" className="btn-1">
                Sign In
              </a>
              <a href="signup-dark.html" className="btn-2">
                Get Started
              </a>
            </ul>
          </div>
        </nav>
      </header> */}

      <img style={{ position: "absolute" }} src="/bg-3.png" />

      <div
        style={{
          color: "#fff",
          marginTop: "2rem",
          backgroundImage: "/bg-3.png",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
        }}
        className="landing-hero ptb70"
      >
        <div className="container">
          <div className="row">
            <div className="offset-md-2 mt-4 col-md-8 text-center">
              <h2>A trusted and secure cryptocurrency exchange.</h2>
              <p>
                Crypo is the most advanced UI kit for making the Blockchain
                platform. This kit comes with 4 different exchange page, market,
                wallet and many more
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ color: "#fff" }} className="landing-feature ptb70">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>
                Here are a few reasons why <br /> you should choose Pyxkrypto
              </h2>
            </div>
            <div className="col-md-4">
              <div className="landing-feature-item">
                <img src="assets/img/landing/stroge.svg" alt="" />
                <h3>Secure storage</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
                  quaerat, quidem ut, fugiat blanditiis facere
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="landing-feature-item">
                <img src="assets/img/landing/backup.svg" alt="" />
                <h3>Protected by insurance</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
                  quaerat, quidem ut, fugiat blanditiis facere
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="landing-feature-item">
                <img src="assets/img/landing/managment.svg" alt="" />
                <h3>Industry best practices</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
                  quaerat, quidem ut, fugiat blanditiis facere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MarketsList />

      <div style={{ color: "#fff" }} className="landing-feature landing-start">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Get started in a few steps</h2>
            </div>
            <div className="col-md-4">
              <div className="landing-feature-item">
                <img src="assets/img/landing/user.svg" alt="" />
                {/* <span>1</span> */}
                <h3>Create an account </h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="landing-feature-item">
                <img src="assets/img/landing/bank.svg" alt="" />
                {/* <span>2</span> */}
                <h3>Link your bank account </h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="landing-feature-item">
                <img src="assets/img/landing/trade.svg" alt="" />
                {/* <span>3</span> */}
                <h3>Start buying & selling</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        style={{ background: "black", marginTop: "4rem" }}
        className="w-100 py-4 flex-shrink-0 "
      >
        <div className="container py-4">
          <div className="row gy-4 gx-5">
            <div className="col-lg-4 col-md-6">
              <h5 className="h1 text-white">Pyxkrypto</h5>
              <p className="small text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <p className="small text-muted mb-0">
                &copy; Copyrights. All rights reserved.{" "}
                <a className="text-primary" href="#">
                  Bootstrapious.com
                </a>
              </p>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="text-white mb-3">Quick links</h5>
              <ul className="list-unstyled text-muted">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Get started</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="text-white mb-3">Quick links</h5>
              <ul className="list-unstyled text-muted">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Get started</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white mb-3">Newsletter</h5>
              <p className="small text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <form action="#">
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-primary"
                    id="button-addon2"
                    type="button"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
