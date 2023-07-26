import React, { memo } from "react";

import { useSelector } from "react-redux";

const MarketDetails = ({ currencydata, exchangeId, mcoinCurrency }) => {
  const { baseCurrency } = useSelector((state) => state.auth);

  return (
    <div className="container">
      <div className="row justify-content-start">
        {exchangeId !== "mcoin" && (
          <div style={{ color: "#fff" }} className="col-4">
            {currencydata && currencydata?.symbol?.toUpperCase()}/{baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId === "mcoin" && (
          <div style={{ color: "#fff" }} className="col-4">
            {mcoinCurrency &&
              mcoinCurrency?.symbol.replace("_INR", "").replace("_USDT", "")}
            /{baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId !== "mcoin" && (
          <div style={{ color: "#fff" }} className="col-4">
            Last Price: {baseCurrency === "INR" && "₹"}
            {currencydata.current_price}{" "}
            {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId === "mcoin" && (
          <div style={{ color: "#fff" }} className="col-4">
            Last Price: {baseCurrency === "INR" && "₹"}
            {mcoinCurrency?.last} {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId !== "mcoin" && (
          <div style={{ color: "#fff" }} className="col-4">
            24 hr change :{baseCurrency === "INR" && "₹"}{" "}
            {currencydata?.price_change_24h}{" "}
            {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId === "mcoin" && (
          <div style={{ color: "#fff" }} className="col-4">
            24 hr change :{baseCurrency === "INR" && "₹"}{" "}
            {mcoinCurrency?.price_change}{" "}
            {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
      </div>
      <div style={{ color: "#fff" }} className="row justify-content-start">
        {exchangeId !== "mcoin" && (
          <div className="col-4">
            24 hrs high : {baseCurrency === "INR" && "₹"}{" "}
            {currencydata?.high_24h} {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId === "mcoin" && (
          <div className="col-4">
            24 hrs high : {baseCurrency === "INR" && "₹"} {mcoinCurrency?.high}{" "}
            {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId !== "mcoin" && (
          <div className="col-4">
            24 hrs low: {baseCurrency === "INR" && "₹"} {currencydata?.low_24h}{" "}
            {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId === "mcoin" && (
          <div className="col-4">
            24 hrs low: {baseCurrency === "INR" && "₹"} {mcoinCurrency?.low}{" "}
            {baseCurrency !== "INR" && baseCurrency}
            {baseCurrency === "USD" && "T"}
          </div>
        )}
        {exchangeId !== "mcoin" && (
          <div className="col-4">
            24 hrs volume: {currencydata?.total_volume}
          </div>
        )}
        {exchangeId === "mcoin" && (
          <div className="col-4">24 hrs volume: {mcoinCurrency?.volume}</div>
        )}
      </div>
    </div>

    // <div className="h-18 bg-gray-100 flex p-2 text-sm justify-between">
    //   <div className="border-r-2 pr-3">
    //     <h2 className="text-lg">
    //       {currencydata.symbol}/INR{" "}
    //     </h1>
    //   </div>
    //   <div className="px-2">
    //     <h1>Last Price</h1>
    //     {currencydata.current_price && (
    //       <p>₹ {currencydata.current_price}</p>
    //     )}
    //   </div>
    //   <div className="px-2">
    //     <h1>24 hr change</h1>
    //     <p>
    //       {currencydata.price_change_24h_in_currency && (
    //         <>
    //           ₹{" "}
    //           {
    //             currencydata.price_change_24h_in_currency
    //           }
    //         </>
    //       )}
    //     </p>
    //   </div>
    //   <div className="px-2">
    //     <h1>24 hr high</h1>
    //     <p>
    //       {currencydata.high_24h && (
    //         <>₹ {currencydata.high_24h}</>
    //       )}
    //     </p>
    //   </div>
    //   <div className="px-2">
    //     <h1>24 hr low</h1>
    //     <p>
    //       {currencydata.low_24h && (
    //         <>₹ {currencydata.low_24h}</>
    //       )}
    //     </p>
    //   </div>
    //   <div className="px-2">
    //     <h1>24 hr volume</h1>
    //     {currencydata.total_volume && (
    //       <>₹ {currencydata.total_volume}</>
    //     )}
    //   </div>
    // </div>
  );
};

export default memo(MarketDetails);
