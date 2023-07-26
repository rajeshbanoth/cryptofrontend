import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import QRCode from "react-qr-code";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../redux/slice/walletSlice";

const withDrawEndPoint = {
  ETH: "sendEthToWallet",
  BTC: "sendBitcoinToWallet",
  MATIC: "sendMaticToWallet",
  DOGE: "sendDogecoinToWallet",
  TRON: "sendTronToWallet",
  SOL: "sendSolanaToWallet",
  XRP: "sendXrpToWallet",
  XLM: "sendXlmToWallet",
  BCH: "sendBitcoinCashToWallet",
  LTC: "sendLitecoinToWallet",
  ADA: "sendAdaToWallet",
};

const MarketCarouselItem = ({ item }) => {
  const dispatch = useDispatch();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [depositAddress, setDepositAddress] = useState("");

  const [destinationTag, setDestinationTag] = useState("");
  const [memo, setMemo] = useState("");

  const handleDepositClose = async () => {
    if (item.currency === "SOL") {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/wallet/deleteAddress/${item?.id}`
        );
      } catch (error) {}
    }
    setDepositAddress("");
    setDestinationTag("");
    setShowDeposit(false);
  };
  const handleWithdrawClose = () => setShowWithdraw(false);

  const [depositExternalAddress, setDepositExternalAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleDepositShow = () => {
    setShowDeposit(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };

    let path = "tgenerateDeposit";

    if (item.currency === "SOL") {
      path = "tgenerateSolAddress";
    }

    axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/wallet/${path}/${item?.id}`,
        config
      )
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          setDepositAddress(res.data.address);
          if (item?.currency === "XRP") {
            setDestinationTag(res.data.destinationTag);
          }

          if (item?.currency === "XLM") {
            setMemo(res.data.message);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      };

      const payload = {
        amount: withdrawAmount,
        address: depositExternalAddress,
        accId: item?.id,
      };

      setShowWithdraw(false);
      dispatch(setLoading(true));
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/wallet/${
          withDrawEndPoint[item?.currency]
        }`,
        payload,
        config
      );

      dispatch(setLoading(false));

      setDepositExternalAddress("");
      setWithdrawAmount("");

      toast.success(
        "Transaction successfully executed, Please wait for sometime",
        {
          position: toast.POSITION.TOP_RIGHT,
          showProgressBar: false,
        }
      );
    } catch (error) {
      toast.error(error.response.data.errors[0].message, {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });

      dispatch(setLoading(false));
      setDepositExternalAddress("");
      setWithdrawAmount("");
    }
  };

  return (
    <>
      <Modal size="xl" show={showDeposit} onHide={handleDepositClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={3}>
              <div>
                <QRCode value={depositAddress} />
              </div>
            </Col>
            <Col lg={9}>
              <p style={{ fontWeight: "bold", margin: 0 }}>Deposit Address:</p>
              <p style={{ fontWeight: "bold" }}>{depositAddress}</p>
              {item?.currency === "XRP" && (
                <>
                  <p style={{ fontWeight: "bold" }}>
                    Destination Tag: {destinationTag}
                  </p>
                </>
              )}
              {item?.currency === "XLM" && (
                <>
                  <p style={{ fontWeight: "bold" }}>Destination Memo: {memo}</p>
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleDepositClose}
          >
            Close
          </button>
          {/* <button type="submit" className="btn btn-primary"  onClick={handleClose}>
            Save Changes
          </button> */}
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={showWithdraw} onHide={handleWithdrawClose}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleWithdraw}>
            <div className="form-row mt-4">
              <div className="col-md-6">
                <label htmlFor="formFirst">Deposit Address</label>
                <input
                  id="formFirst"
                  type="text"
                  onChange={(e) => setDepositExternalAddress(e.target.value)}
                  className="form-control"
                  placeholder="Enter Deposit Address"
                  value={depositExternalAddress}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="formFirst">Amount</label>
                <input
                  id="formFirst"
                  type="text"
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="form-control"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleWithdrawClose}
          >
            Close
          </button>
          {/* <button type="submit" className="btn btn-primary"  onClick={handleClose}>
            Save Changes
          </button> */}
        </Modal.Footer>
      </Modal>
      <div className="market-carousel-item">
        <div className="market-carousel-item-name">
          <img src={"img/icon/1.png"} alt="" />
          <strong>
            {item?.currency.replace("4", "").replace("_TRON", "")}
          </strong>
        </div>

        <h5>
          Acount bal: {parseFloat(item?.balance?.accountBalance).toFixed(6)}
        </h5>
        <h5>
          Available bal:{" "}
          {parseFloat(item?.balance?.availableBalance).toFixed(6)}
        </h5>
        <p>Account id:{item.id}</p>
        <button className="btn buy" onClick={() => handleDepositShow(item)}>
          Deposit
        </button>
        <button onClick={() => setShowWithdraw(true)} className="btn sell">
          Withdraw
        </button>
      </div>
    </>
  );
};

export default MarketCarouselItem;
