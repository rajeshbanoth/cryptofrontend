import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CRYPTO_LIST = {
  mcoin: "MCOIN4",
  bitcoin: "BTC",
  ethereum: "ETH",
  cardano: "ADA",
  "matic-network": "MATIC",
  ripple: "XRP",
  dogecoin: "DOGE",
  stellar: "XLM",
  litecoin: "LTC",
  tether: "USDT",
};

export default function OrderBook({ exchangeId }) {
  const { baseCurrency, user } = useSelector((state) => state.auth);

  const [activeBuy, setActiveBuy] = useState([]);
  const [activeSell, setActiveSell] = useState([]);

  useEffect(() => {
    let type;
    if (baseCurrency === "INR") {
      type = "VC_INR";
    } else if (baseCurrency === "USD") {
      type = "USDT";
    } else if (baseCurrency === "BTC") {
      type = "BTC";
    }

    const marketPair = `${CRYPTO_LIST[exchangeId]}/${type}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const fetchOrderBook = async () => {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/trade/tAllSingleCoinActiveOrders",
        {
          marketPair: marketPair,
        },
        config
      );

      setActiveBuy(data?.activeBuy.reverse());
      setActiveSell(data?.activeSell.reverse());
    };

    fetchOrderBook();
  }, [exchangeId, baseCurrency]);

  return (
    <>
      <div className="order-book mb15">
        <h2 className="heading">Order Book</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Price(BTC)</th>
              <th>Amount(ETH)</th>
              <th>Total(ETH)</th>
            </tr>
          </thead>
          <tbody>
            {activeSell?.map((sell) => {
              return (
                <tr className="red-bg-80">
                  <td className="red">{sell?.price}</td>
                  <td>{sell?.amount}</td>
                  <td>{parseFloat(sell?.amount * sell?.price).toFixed(5)}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody className="ob-heading">
            <tr>
              <td>
                <span>Last Price</span>
                0.020367
              </td>
              <td>
                <span>USD</span>
                148.65
              </td>
              <td className="red">
                <span>Change</span>
                -0.51%
              </td>
            </tr>
          </tbody>
          <tbody>
            {activeBuy?.map((buy) => {
              return (
                <tr className="green-bg-80">
                  <td className="green">{buy?.price}</td>
                  <td>{buy?.amount}</td>
                  <td>{parseFloat(buy?.amount * buy?.price).toFixed(5)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
