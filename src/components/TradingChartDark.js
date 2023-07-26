import moment from "moment";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { AdvancedChart } from "react-tradingview-embed";

const CRYPTO_LIST = {
  mcoin: "MCOIN",
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

const TradingChart = ({ exchangeId }) => {
  const { baseCurrency } = useSelector((state) => state.auth);

  const coin = CRYPTO_LIST[exchangeId];

  const currentDate = moment();
  const pastDate = moment().subtract(30, "days");

  console.log("currentDate", currentDate);
  console.log("pastDate", pastDate);

  return (
    <>
      <div className="main-chart mb15">
        <AdvancedChart
          widgetProps={{
            theme: "dark",
            symbol: `${coin}${baseCurrency.replace("USD", "USDT")}`,
            allow_symbol_change: true,
            toolbar_bg: "#000",
            height: 550,
          }}
        />
      </div>
    </>
  );
};

export default memo(TradingChart);
