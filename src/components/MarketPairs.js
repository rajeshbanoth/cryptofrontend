import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";
import { useDispatch } from "react-redux";
import CryptoGraph from "./Cryptograph";
import { useHistory } from "react-router-dom";
import HistoryOrder from "./HistoryOrder";
import MarketHistory from "./MarketHistory";
import MarketNews from "./MarketNews";
import { useSelector } from "react-redux";
import MarketTrade from "./MarketTrade";
import OrderBook from "./OrderBook";
import MarketDetails from "./MarketDetails";
import { useParams } from "react-router-dom";
import { getUserWalletInfo } from "../redux/slice/walletSlice";

// import TradingChartDark from "./TradingChartDark";

const listedcrypto = require("./ListedCrypto");

export default function MarketPairs(props) {
  const dispatch = useDispatch();
  const { exchangeId } = useParams();

  const { user, baseCurrency } = useSelector((state) => state.auth);

  const history = useHistory();
  const [currencydata, setcurrencydata] = useState("");
  const [listedCurrency, setlistedcurrency] = useState([]);
  const [lastPrice, setLastPrice] = useState(0);
  const [coinid, setcoinid] = useState("");

  const [mcoinCurrency, setMcoincurrency] = useState(null);

  // useEffect(() => {
  //   if (!user) {
  //     history.push("/");
  //   }
  // }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(getUserWalletInfo());
    }
  }, [dispatch, user]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency.toLowerCase()}`
      )
      .then((res) => {
        let LISTED_CURRENCY = listedcrypto.LISTED_CURRENCY;
        let data = res.data;

        let tempFilteredData = [];
        for (let i = 0; i < LISTED_CURRENCY.length; i++) {
          const filterData = data.filter((coin) => {
            return coin.symbol === LISTED_CURRENCY[i].symbol;
          });

          if (filterData.length > 0) {
            tempFilteredData.push(filterData[0]);
          }
        }

        const filterCurrencyData = tempFilteredData.filter((currency) => {
          return currency.id === exchangeId;
        });

        setlistedcurrency(tempFilteredData);

        if (filterCurrencyData && filterCurrencyData.length > 0) {
          setcurrencydata(filterCurrencyData[0]);
          setcoinid(filterCurrencyData[0].id);
          setLastPrice(filterCurrencyData[0].current_price);
        }

        // console.log(listedCurrency);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          `/instant/ticker/mcoin/${baseCurrency}`
      )
      .then((res) => {
        setMcoincurrency(res?.data?.data);
        if (exchangeId === "mcoin") {
          setLastPrice(res?.data?.data?.last);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [exchangeId, baseCurrency]);

  return (
    <>
      <div className="container-fluid mtb15 no-fluid">
        <div className="row sm-gutters">
          <div className="col-sm-12 col-md-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  <i className="icon ion-md-search"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>

            <table className="table star-active">
              <thead>
                <tr>
                  <th>Pairs</th>
                  <th>Last Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {listedCurrency && listedCurrency.length > 0 && (
                  <>
                    <tr
                      key={"index"}
                      onClick={() => {
                        history.push(`/exchange/mcoin`);
                      }}
                    >
                      <td>
                        {/* <i className="icon ion-md-star"></i> */}
                        {mcoinCurrency?.symbol
                          ?.replace("_INR", "")
                          .replace("_USDT", "")}
                        /{baseCurrency}
                        {baseCurrency === "USD" && "T"}
                      </td>
                      <td>
                        {mcoinCurrency?.last &&
                          parseFloat(mcoinCurrency?.last).toFixed(6)}
                      </td>
                      <td className="red">
                        {mcoinCurrency?.price_change &&
                          parseFloat(mcoinCurrency?.price_change).toFixed(7)}
                      </td>
                    </tr>
                    {listedCurrency
                      .filter((currency) => {
                        let base = baseCurrency;
                        if (base === "USD") {
                          base = "USDT";
                        }
                        if (currency.symbol.toUpperCase() !== base) {
                          return currency;
                        }
                      })
                      .map((item, index) => {
                        // console.log("item", item);
                        return (
                          <tr
                            key={index}
                            onClick={() => {
                              history.push(`/exchange/${item?.id}`);
                            }}
                          >
                            <td>
                              {/* <i className="icon ion-md-star"></i> */}
                              {item?.symbol?.toUpperCase()}/{baseCurrency}
                              {baseCurrency === "USD" && "T"}
                            </td>
                            <td>
                              {item?.current_price &&
                                parseFloat(item?.current_price).toFixed(6)}
                            </td>
                            <td className="red">
                              {baseCurrency === "INR" &&
                                item?.price_change_24h &&
                                parseFloat(item?.price_change_24h).toFixed(4)}
                              {baseCurrency === "USD" &&
                                item?.price_change_24h &&
                                parseFloat(item?.price_change_24h).toFixed(5)}
                              {baseCurrency === "BTC" &&
                                item?.price_change_24h &&
                                parseFloat(item?.price_change_24h).toFixed(7)}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="col-sm-12 col-md-6">
            <div>
              <MarketDetails
                currencydata={currencydata}
                mcoinCurrency={mcoinCurrency}
                exchangeId={exchangeId}
              />
            </div>

            {exchangeId && (
              <CryptoGraph coin={coinid} exchangeId={exchangeId} />
            )}

            {/* <TradingChartDark exchangeId={exchangeId} /> */}
            <div>
              <MarketTrade limitvalue={lastPrice} />
            </div>
          </div>

          <div className="col-md-3">
            <OrderBook exchangeId={exchangeId} />
            <MarketHistory exchangeId={exchangeId} />
          </div>
          <div className="col-md-3">
            <MarketNews />
          </div>
          <div className="col-md-9">
            <HistoryOrder />
          </div>
        </div>
      </div>
    </>
  );
}
