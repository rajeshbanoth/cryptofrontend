import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// import faker from "faker";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import moment from "moment";
import { useSelector } from "react-redux";

Chart.register(CategoryScale);

export default function CryptoGraph({ coin, exchangeId }) {
  const { user, baseCurrency } = useSelector((state) => state.auth);

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [historicData, setHistoricData] = useState();
  const [mcoinHistoricData, setMcoinHistoricData] = useState();
  // const [coin, setCoin] = useState();
  const [flag, setflag] = useState(false);

  const currentDate = moment();
  const pastDate = moment().subtract(30, "days");

  const fetchHistoricalData = async () => {
    try {
      // const { data } = await axios.get(historicalChart(1, days, "INR"));
      const URL = `https://api.coingecko.com/api/v3/coins/${coin}`;

      const res = await fetch(URL);
      const data = await res.json();

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=inr&days=30`
      );

      const history = await response.json();
      setflag(true);
      setHistoricData(history.prices);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchMcoinHistoricalData = async () => {
    try {
      // const { data } = await axios.get(historicalChart(1, days, "INR"));

      const response = await fetch(
        `https://api.coinpaprika.com/v1/coins/mcoin-mcoin/ohlcv/historical?start=2021-02-15&end=2021-10-12`
      );

      const history = await response.json();

      setflag(true);
      setMcoinHistoricData(history);
      // setHistoricData(history.prices);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (exchangeId === "mcoin") {
      fetchMcoinHistoricalData();
    } else {
      if (coin) {
        fetchHistoricalData();
      }
    }
  }, [coin, exchangeId]);

  return (
    <>
      <div>
        {!historicData | (flag === false) ? (
          <></>
        ) : (
          <>
            {exchangeId !== "mcoin" ? (
              <>
                <Line
                  data={{
                    labels: historicData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return 30 === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: historicData.map((coin) => coin[1]),
                        label: `Price ( Past ${"30"} Days ) in Inr`,
                        borderColor: "#EEBC1D",
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                ></div>
              </>
            ) : (
              <>
                {!!mcoinHistoricData && (
                  <Line
                    data={{
                      labels: mcoinHistoricData?.map((coin) => {
                        let date = Date.now(coin.time_close);
                        let date1 = new Date(date);
                        let time =
                          date1.getHours() > 12
                            ? `${
                                date1.getHours() - 12
                              }:${date1.getMinutes()} PM`
                            : `${date1.getHours()}:${date1.getMinutes()} AM`;
                        return 30 === 1 ? time : date1.toLocaleDateString();
                      }),

                      datasets: [
                        {
                          data: mcoinHistoricData?.map((coin) => {
                            if (baseCurrency === "INR")
                              return coin.close * 74.05;
                            if (baseCurrency === "USD") return coin.close;
                            if (baseCurrency === "BTC")
                              return coin.close * 0.00000644;
                            return coin.close;
                          }),
                          label: `Price ( Past ${"30"} Days ) in Inr`,
                          borderColor: "#EEBC1D",
                        },
                      ],
                    }}
                    options={{
                      elements: {
                        point: {
                          radius: 1,
                        },
                      },
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                ></div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
