import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  formatLastestBuyorSellPrice,
  inputValidation,
} from "../../utils/validation";

import { getUserWalletInfo, setLoading } from "../../redux/slice/walletSlice";
import {
  getPendingOrders,
  setCryptoMarketPair,
} from "../../redux/slice/orderSlice";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const LISTED_CURRENCY = [
  {
    name: "BTC",
    id: "bitcoin",
  },
  {
    name: "ETH",
    id: "ethereum",
  },
  {
    name: "MATIC",
    id: "matic-network",
  },
  // {
  //   name: "SOL",
  //   id: "solana",
  // },
  {
    name: "XRP",
    id: "ripple",
  },
  {
    name: "LTC",
    id: "litecoin",
  },
  {
    name: "ADA",
    id: "cardano",
  },
  // {
  //   name: "TRON",
  //   id: "tron",
  // },
  {
    name: "DOGE",
    id: "dogecoin",
  },
  // {
  //   name: "LUNA",
  //   id: "terra-luna",
  // },
  {
    name: "USDT",
    id: "tether",
  },
  {
    name: "XLM",
    id: "stellar",
  },
  {
    name: "MCOIN4",
    id: "mcoin",
  },
];

const LimitOrder = ({ price, side, type }) => {
  const dispatch = useDispatch();
  const { exchangeId } = useParams();
  const [show, setShow] = useState(false);
  const [latestPrice, setLatestPrice] = useState("");
  const [latestStopPrice, setLatestStopPrice] = useState("");
  const [totalInrPrice, setTotalInrPrice] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [marketPair, setMarketPair] = useState("");
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  const [account1, setAccount1] = useState(null);
  const [account2, setAccount2] = useState(null);

  const [availableBalance, setAvailableBalance] = useState("");

  const { walletInfo } = useSelector((state) => state.wallet);
  const { baseCurrency, user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLatestPrice(price);
    setLatestStopPrice(price);
  }, [price]);

  useEffect(() => {
    if (walletInfo) {
      setTotalInrPrice("");
      setCryptoAmount("");

      const token1 = LISTED_CURRENCY.filter((token) => {
        return token.id === exchangeId;
      });

      const filterWalletBalance = walletInfo.filter((wallet) => {
        return wallet.currency === token1[0].name;
      });

      if (filterWalletBalance.length > 0) {
        setAccount1(filterWalletBalance[0]?.id);
      }

      setTicker(token1[0]?.name);

      const token2 = walletInfo.filter((token) => {
        return token.currency.includes(baseCurrency.toUpperCase());
      });

      setAccount2(token2[0]?.id);
      setMarketPair(`${token1[0]?.name}/${token2[0]?.currency}`);

      // set Available Balance
      if (side === "buy")
        setAvailableBalance(token2[0]?.balance?.availableBalance);

      if (side === "sell")
        setAvailableBalance(filterWalletBalance[0]?.balance?.availableBalance);

      dispatch(
        setCryptoMarketPair(`${token1[0]?.name}/${token2[0]?.currency}`)
      );
    }
  }, [walletInfo, exchangeId, baseCurrency]);

  const handleClose = () => setShow(false);

  const placeOrder = async (e) => {
    e.preventDefault();

    setError(null);

    if (type === "STOP_LIMIT") {
      if (side === "buy") {
        if (latestPrice < latestStopPrice) {
          setError("Limit price should be more than stop price");
          return;
        }
      }
    }
    if (type === "STOP_LIMIT") {
      if (side === "sell") {
        if (latestPrice > latestStopPrice) {
          setError("Limit price should be less than stop price");
          return;
        }
      }
    }

    const { status, errorMessage } = inputValidation({
      latestPrice: latestPrice,
      cryptoAmount: cryptoAmount,
      totalInrPrice,
      side: side,
    });

    if (!status) {
      setError(errorMessage);
      return;
    }

    const modifyPriceAndAmount = formatLastestBuyorSellPrice({
      price: latestPrice,
      exchange: exchangeId,
      amount: cryptoAmount,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const payload = {
      price: modifyPriceAndAmount.modifyPrice,
      amount: modifyPriceAndAmount.modifyCoinAmount,
      type: type,
      pair: marketPair,
      side: side.toUpperCase(),
      currency1AccountId: account1,
      currency2AccountId: account2,
    };

    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/trade/torder`,
        payload,
        config
      );

      dispatch(setLoading(false));

      setShow(true);

      dispatch(getUserWalletInfo());
      dispatch(getPendingOrders());
    } catch (error) {
      dispatch(setLoading(false));
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClose}
          >
            Close
          </button>
          {/* <button type="submit" className="btn btn-primary"  onClick={handleClose}>
            Save Changes
          </button> */}
        </Modal.Footer>
      </Modal>
      <form onSubmit={placeOrder}>
        {type === "STOP_LIMIT" && (
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="0"
              required
              disabled={type === "MARKET" ? true : false}
              value={latestStopPrice}
              onChange={(e) => {
                setLatestStopPrice(e.target.value);
              }}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                {type?.replace("_", " ")}
              </span>
            </div>
          </div>
        )}
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="0"
            required
            disabled={type === "MARKET" ? true : false}
            value={latestPrice}
            onChange={(e) => {
              setLatestPrice(e.target.value);
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              {type === "STOP_LIMIT" ? "LIMIT PRICE" : type}
            </span>
          </div>
        </div>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            required
            value={cryptoAmount}
            onChange={(e) => {
              let tempInrAmount = e.target.value * latestPrice;
              setTotalInrPrice(tempInrAmount);
              setCryptoAmount(e.target.value);
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text">{ticker?.replace("4", "")}</span>
          </div>
        </div>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            required
            value={totalInrPrice}
            onChange={(e) => {
              let tempCoinAmount = e.target.value / latestPrice;
              setTotalInrPrice(e.target.value);
              setCryptoAmount(tempCoinAmount);
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text">INR</span>
          </div>
        </div>
        <h6 style={{ color: "red", textAlign: "center" }}>{error && error} </h6>
        <ul className="market-trade-list">
          <li>
            <a href="#!">25%</a>
          </li>
          <li>
            <a href="#!">50%</a>
          </li>
          <li>
            <a href="#!">75%</a>
          </li>
          <li>
            <a href="#!">100%</a>
          </li>
        </ul>
        <p>
          Available:{" "}
          <span>
            {availableBalance} {side === "buy" ? baseCurrency : ticker}
          </span>
        </p>
        {/* <p>
          Volume: <span>0 BTC = 0 USD</span>
        </p>
        <p>
          Margin: <span>0 BTC = 0 USD</span>
        </p>
        <p>
          Fee: <span>0 BTC = 0 USD</span>
        </p> */}
        {user?.kycVerifyStatus === "VERIFIED" && (
          <button type="submit" className={`btn ${side}`}>
            {side}
          </button>
        )}
        {user?.kycVerifyStatus === "PENDING" && (
          <button disabled className={`btn ${side}`}>
            KYC Pending ...
          </button>
        )}
        {user?.kycVerifyStatus === "NOT_VERIFIED" && (
          <button disabled className={`btn ${side}`}>
            Verify Kyc...
          </button>
        )}

        {!user && (
          <button
            onClick={() => history.push("/login")}
            className={`btn ${side}`}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default LimitOrder;
