import React, { useEffect } from "react";
import MarketCarousel from "../components/MarketCarousel";
import MarketsList from "../components/MarketsList";

import { useSelector, useDispatch } from "react-redux";
import { getUserWalletInfo } from "../redux/slice/walletSlice";
import { useHistory } from "react-router-dom";

export default function Markets() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(getUserWalletInfo());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <MarketCarousel />
          </div>
        </div>
      </div>
      <MarketsList />
    </>
  );
}
