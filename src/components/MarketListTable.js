import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const listedcrypto = require("./ListedCrypto");

const MarketListTable = ({ type, coin = "" }) => {
  const history = useHistory();
  const [listedCurrency, setlistedcurrency] = useState([]);
  const [mcoinCurrency, setMcoincurrency] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${type}`)
      .then((res) => {
        let LISTED_CURRENCY = listedcrypto.LISTED_CURRENCY;
        let data = res.data;

        let tempFilteredData = [];
        for (let i = 0; i < LISTED_CURRENCY.length; i++) {
          const filterData = data.filter((coin) => {
            return coin.symbol === LISTED_CURRENCY[i].symbol;
          });

          //   console.log(filterData);

          if (filterData.length > 0) {
            tempFilteredData.push(filterData[0]);
          }
        }

        setlistedcurrency(tempFilteredData);

        // console.log(listedCurrency);
      })
      .catch((error) => console.log("error: ", error));

    const getMcoin = async () => {
      try {
        if (type.toLowerCase() === "inr") {
          const { data } = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/instant/ticker/mcoin/INR"
          );

          setMcoincurrency(data?.data);
        }
        if (type.toLowerCase() === "usd") {
          const { data } = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/instant/ticker/mcoin/USD"
          );

          setMcoincurrency(data?.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getMcoin();

    // axios
    //   .get("https://api.coinpaprika.com/v1/tickers")
    //   .then((res) => {
    //     console.log("mcoin", res.data);
    //     const formattedData = {
    //       id: "Mcoin",
    //       symbol: "Mcoin",
    //       current_price: "",
    //     };
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });
  }, []);

  return (
    <div className="table-responsive">
      <table className="table star-active">
        <thead>
          <tr>
            <th>Pairs</th>
            <th>Coin</th>
            <th>Last Price</th>
            <th>Change (24H)</th>
            <th>High (24H)</th>
            <th>Low (24h)</th>
            <th>Volume (24h)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {mcoinCurrency && (
            <tr
              onClick={() => history.push(`/exchange/mcoin`)}
              data-href="exchange-light.html"
            >
              <td>
                <i className="icon ion-md-star"></i>{" "}
                {mcoinCurrency?.symbol?.replace("_", "/")}
              </td>
              <td>
                {/* <img src={item?.image} alt="eth" />{" "} */}
                {mcoinCurrency?.symbol
                  ?.replace("_INR", "")
                  .replace("_USDT", "")}
              </td>
              <td>
                {type === "inr" && "₹"}
                {mcoinCurrency?.last}
                {type === "btc" && "BTC"}
                {type === "usd" && coin === "" && "USDT"}
                {coin === "mcoin" && "MCOIN"}
              </td>
              <td className="green">{mcoinCurrency?.price_change}</td>
              <td>
                {type === "inr" && "₹"}
                {coin === ""
                  ? mcoinCurrency?.high
                  : parseFloat(mcoinCurrency?.high / 0.24).toFixed(2)}{" "}
                {type === "btc" && "BTC"}
                {type === "usd" && coin === "" && "USDT"}
                {coin === "mcoin" && "MCOIN"}
              </td>
              <td>
                {type === "inr" && "₹"}
                {coin === ""
                  ? mcoinCurrency?.low
                  : parseFloat(mcoinCurrency?.low).toFixed(2)}{" "}
                {type === "btc" && "BTC"}
                {type === "usd" && coin === "" && "USDT"}
                {coin === "mcoin" && "MCOIN"}
              </td>
              <td>{mcoinCurrency?.volume}</td>
              <td>
                {type === "inr" && "₹"}{" "}
                {parseFloat(mcoinCurrency?.last) * 499999995.0}{" "}
                {type === "btc" && "BTC"}
                {type === "usd" && coin === "" && "USDT"}
                {coin === "mcoin" && "MCOIN"}
              </td>
            </tr>
          )}
          {listedCurrency?.map((item) => {
            // console.log("item", item);
            return (
              <tr
                onClick={() => history.push(`/exchange/${item?.id}`)}
                data-href="exchange-light.html"
              >
                <td>
                  <i className="icon ion-md-star"></i>{" "}
                  {item?.symbol?.toUpperCase()}/
                  {type?.toUpperCase().replace("USD", "USDT")}
                </td>
                <td>
                  <img src={item?.image} alt="eth" />{" "}
                  {item?.symbol?.toUpperCase()}
                </td>
                <td>
                  {type === "inr" && "₹"}
                  {coin === ""
                    ? item?.current_price
                    : parseFloat(item?.current_price / 0.24).toFixed(2)}{" "}
                  {type === "btc" && "BTC"}
                  {type === "usd" && coin === "" && "USDT"}
                  {coin === "mcoin" && "MCOIN"}
                </td>
                <td className="green">{item?.price_change_24h}</td>
                <td>
                  {type === "inr" && "₹"}
                  {coin === ""
                    ? item?.high_24h
                    : parseFloat(item?.high_24h / 0.24).toFixed(2)}{" "}
                  {type === "btc" && "BTC"}
                  {type === "usd" && coin === "" && "USDT"}
                  {coin === "mcoin" && "MCOIN"}
                </td>
                <td>
                  {type === "inr" && "₹"}
                  {coin === ""
                    ? item?.low_24h
                    : parseFloat(item?.low_24h).toFixed(2)}{" "}
                  {type === "btc" && "BTC"}
                  {type === "usd" && coin === "" && "USDT"}
                  {coin === "mcoin" && "MCOIN"}
                </td>
                <td>{item?.total_volume}</td>
                <td>
                  {type === "inr" && "₹"} {item?.market_cap}{" "}
                  {type === "btc" && "BTC"}
                  {type === "usd" && coin === "" && "USDT"}
                  {coin === "mcoin" && "MCOIN"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketListTable;
