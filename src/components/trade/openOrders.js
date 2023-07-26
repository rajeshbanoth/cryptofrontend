import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getPendingOrders } from "../../redux/slice/orderSlice";
import { getUserWalletInfo } from "../../redux/slice/walletSlice";
import axios from "axios";

const SingleOrder = ({ dateString, order, index }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("open");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setStatus("open");
  }, [order]);

  const cancelOrderHandler = async (orderId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/trade/tcancelOrder/${orderId}`,
        config
      );

      setStatus("cancel");
      dispatch(getUserWalletInfo());
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ul
      key={index}
      style={{
        backgroundColor: status === "cancel" && "rgba(255, 0, 0 , 0.3)",
      }}
      className="d-flex justify-content-between market-order-item"
    >
      <li>
        <p style={{ margin: "0" }}>
          {moment(dateString).format("MMM Do YYYY")}{" "}
        </p>
        <p>{moment(dateString).format("h:mm a")}</p>
      </li>
      <li>{order?.pair}</li>
      <li>All Types</li>
      <li>{order.type}</li>
      <li>{order?.price}</li>
      <li>{order?.amount}</li>
      <li>
        {status !== "cancel" && (
          <button
            onClick={() => cancelOrderHandler(order?.id)}
            className="btn btn-danger btn-sm"
          >
            Cancel
          </button>
        )}
      </li>
    </ul>
  );
};

const OpenOrders = () => {
  const dispatch = useDispatch();
  const { cryptoMarketPair, pendingOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    const getPending = () => {
      if (cryptoMarketPair) {
        dispatch(getPendingOrders(cryptoMarketPair));
      }
    };

    const interval = setInterval(() => {
      getPending();
    }, 6000);

    if (cryptoMarketPair) dispatch(getPendingOrders(cryptoMarketPair));

    return () => {
      console.log("clearing interval");
      // dispatch(clearPendingOrders());
      clearInterval(interval);
    };
  }, [cryptoMarketPair, dispatch]);

  return (
    <div>
      <ul className="d-flex  justify-content-between market-order-item">
        <li>Time</li>
        <li>All pairs</li>
        <li>All Types</li>
        <li>Buy/Sell</li>
        <li>Price</li>
        <li>Amount</li>
        <li>Action</li>
      </ul>

      {pendingOrders.length > 0 ? (
        <>
          {pendingOrders.map((order, index) => {
            const dateString = moment(order.created).toDate();
            return (
              <>
                <SingleOrder
                  index={index}
                  order={order}
                  dateString={dateString}
                />
              </>
            );
          })}
        </>
      ) : (
        <span className="no-data">
          <i className="icon ion-md-document"></i>
          No data
        </span>
      )}
    </div>
  );
};

export default OpenOrders;
