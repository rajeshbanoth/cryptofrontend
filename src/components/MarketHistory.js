import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

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

export default function MarketHistory({ exchangeId }) {
  const { baseCurrency, user } = useSelector((state) => state.auth);

  const [historyOrders, setHistoryOrders] = useState([]);

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
        process.env.REACT_APP_SERVER_URL + "/trade/tAllHistoryTrades",
        {
          marketPair: marketPair,
        },
        config
      );

      setHistoryOrders(data);
    };

    fetchOrderBook();
  }, [exchangeId, baseCurrency]);

  return (
    <>
      <div className="market-history">
        <Tabs defaultActiveKey="recent-trades">
          <Tab eventKey="recent-trades" title="Recent Trades">
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price(BTC)</th>
                  <th>Amount(ETH)</th>
                </tr>
              </thead>
              <tbody>
                {historyOrders &&
                  historyOrders.map((order) => {
                    return (
                      <tr>
                        <td>13:03:53</td>
                        <td className="red">0.020191</td>
                        <td>0.2155045</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
