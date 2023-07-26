import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Switch, Route } from "react-router-dom";
import Exchange from "../pages/exchange";
import Markets from "../pages/markets";
import Profile from "./profile";
import Wallet from "./wallet";
import Settings from "./settings";
import Login from "./login";
import Reset from "./reset";
import OtpVerify from "./otp-verify";
import OtpNumber from "./otp-number";
import Lock from "./lock";
import TermsAndConditions from "./terms-and-conditions";
import NewsDetails from "./news-details";
import Signup from "./signup";
import Notfound from "./notfound";
import MarketPairs from "../components/MarketPairs";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addUserData,
  updateKycData,
  updateUserBankStatus,
} from "../redux/slice/authSlice";
import { useHistory } from "react-router-dom";
import HomePage from "./homePage";

export default function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user?.token}` },
        };

        const userDetails = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/user/details",
          config
        );

        dispatch(updateKycData(userDetails?.data?.kycVerifyStatus));
        dispatch(updateUserBankStatus(userDetails?.data.bankVerifyStatus));
      } catch (error) {
        dispatch(addUserData(null));
        history.push("/");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/exchange/:exchangeId">
            <MarketPairs />
          </Route>
          <Route path="/markets">
            <Markets />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/wallet">
            <Wallet />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
          <Route path="/otp-verify">
            <OtpVerify />
          </Route>
          <Route path="/otp-number">
            <OtpNumber />
          </Route>
          <Route path="/lock">
            <Lock />
          </Route>
          <Route path="/terms-and-conditions">
            <TermsAndConditions />
          </Route>
          <Route path="/news-details">
            <NewsDetails />
          </Route>
          <Route path="/notfound">
            <Notfound />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}
