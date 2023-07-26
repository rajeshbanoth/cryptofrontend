import React, { useEffect, useState } from "react";
import { Row, Col, Nav, Modal } from "react-bootstrap";
import WalletItem from "./walletItem";
import { useSelector } from "react-redux";
import useDepositWithdraw from "../../hooks/useDepositWithdraw";

const Wallet = () => {
  // set amount you wan to deposit
  const [show, setShow] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  const [walletSelected, setWalletSelected] = useState("BTC");

  const { user } = useSelector((state) => state.auth);
  const { walletInfo } = useSelector((state) => state.wallet);

  const { handlePayment, handleWithraw } = useDepositWithdraw({ setShow });

  const [inrBalance, setInrBalance] = useState("");

  useEffect(() => {
    if (walletInfo) {
      const inrValue = walletInfo.filter((wallet) => {
        if (wallet?.currency?.includes("INR")) {
          return wallet;
        }
      });

      setInrBalance(inrValue[0]);
    }
  }, [walletInfo]);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2>{withdrawAmount} Rs will be credited to your bank account</h2>
            <h3>Please confirm</h3>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => handleWithraw(inrBalance?.id, withdrawAmount)}
            >
              Confirm
            </button>
          </div>
        </Modal.Body>
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
      <div className="wallet">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="coinBTC"
            role="tabpanel"
          >
            <div className="card">
              <div className="card-body">
                <Row>
                  <Col lg={4}>
                    <h4 className="">INR Wallet</h4>
                    <h6 className="text-secondary">Available Balance</h6>
                    <h4 className="font-weight-bold">
                      ₹ {inrBalance?.balance?.availableBalance}
                    </h4>
                  </Col>
                  <Col lg={4}>
                    <h4 className="">Deposit</h4>

                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        required
                        disabled={
                          user?.kycVerifyStatus === "VERIFIED" &&
                          user?.bankVerifyStatus === "VERIFIED"
                            ? false
                            : true
                        }
                        value={depositAmount}
                        onChange={(e) => {
                          setDepositAmount(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      disabled={
                        user?.kycVerifyStatus === "VERIFIED" &&
                        user?.bankVerifyStatus === "VERIFIED"
                          ? false
                          : true
                      }
                      className="btn green mt-3"
                      onClick={() => {
                        if (depositAmount > 0)
                          handlePayment({
                            depositAmount,
                            inrBalance: inrBalance?.balance?.availableBalance,
                            accountId: inrBalance?.id,
                          });
                      }}
                    >
                      Deposit
                    </button>
                  </Col>
                  <Col lg={4}>
                    <h4 className="">Withdraw</h4>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        required
                        disabled={
                          user?.kycVerifyStatus === "VERIFIED" &&
                          user?.bankVerifyStatus === "VERIFIED"
                            ? false
                            : true
                        }
                        // disabled={type === "MARKET" ? true : false}
                        value={withdrawAmount}
                        onChange={(e) => {
                          setWithdrawAmount(e.target.value);
                        }}
                      />
                    </div>
                    {withdrawError && (
                      <p style={{ color: "red" }}>{withdrawError}</p>
                    )}
                    <button
                      onClick={() => {
                        if (withdrawAmount > 0) {
                          if (
                            parseFloat(withdrawAmount) <
                            parseFloat(inrBalance?.balance?.availableBalance)
                          ) {
                            setShow(true);
                          } else {
                            setWithdrawError(
                              "withdraw amount cannot be greater than available balance"
                            );
                          }
                        }
                      }}
                      disabled={
                        user?.kycVerifyStatus === "VERIFIED" &&
                        user?.bankVerifyStatus === "VERIFIED"
                          ? false
                          : true
                      }
                      className="btn red mt-3"
                    >
                      Withdraw
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>

        <Row>
          <Col lg={4}>
            <Nav variant="pills" className="settings-nav">
              {walletInfo && walletInfo.length > 0 && (
                <>
                  {walletInfo
                    .filter((wallet) => {
                      if (!wallet.currency.includes("INR")) {
                        return wallet;
                      }
                    })
                    .map((wallet) => {
                      return (
                        <Nav.Item
                          onClick={() => setWalletSelected(wallet?.currency)}
                        >
                          <Nav.Link
                            eventKey={wallet.currency}
                            className="d-flex justify-content-between align-items-center "
                          >
                            <div className="d-flex">
                              <img src={"img/icon/18.png"} alt="btc" />
                              <div>
                                <h2>{wallet?.currency?.replace("4", "")}</h2>
                              </div>
                            </div>
                            <div>
                              <h3>
                                {parseFloat(
                                  wallet?.balance?.accountBalance
                                ).toFixed(6)}
                              </h3>
                              <p className="text-right">
                                <i className="icon ion-md-lock"></i>{" "}
                                {parseFloat(
                                  wallet?.balance?.availableBalance
                                ).toFixed(6)}
                              </p>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
                </>
              )}
            </Nav>
          </Col>

          <Col lg={8}>
            <div className="tab-content">
              {walletInfo &&
                walletInfo.length > 0 &&
                walletInfo.map((wallet) => {
                  return (
                    <>
                      <WalletItem
                        wallet={wallet}
                        walletSelected={walletSelected}
                      />
                    </>
                  );
                })}

              <div className="tab-pane fade" id="coinETH" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Balances</h5>
                    <ul>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-cash"></i>
                          <h2>Total Equity</h2>
                        </div>
                        <div>
                          <h3>4.1542 ETH</h3>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-checkmark"></i>
                          <h2>Available Margin</h2>
                        </div>
                        <div>
                          <h3>1.334 ETH</h3>
                        </div>
                      </li>
                    </ul>
                    <button className="btn green">Deposit</button>
                    <button className="btn red">Withdraw</button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Wallet Deposit Address</h5>
                    <div className="row wallet-address">
                      <div className="col-md-8">
                        <p>
                          Deposits to this address are unlimited. Note that you
                          may not be able to withdraw all of your funds at once
                          if you deposit more than your daily withdrawal limit.
                        </p>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                          />
                          <div className="input-group-prepend">
                            <button className="btn btn-primary">COPY</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img src={"img/qr-code-dark.svg"} alt="qr-code" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Latest Transactions</h5>
                    <div className="wallet-history">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>25-04-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>4.5454334</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>25-05-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>0.5484468</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-06-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>25-07-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>1.45894147</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-08-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="coinBNB" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Balances</h5>
                    <ul>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-cash"></i>
                          <h2>Total Equity</h2>
                        </div>
                        <div>
                          <h3>7.342 BNB</h3>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-checkmark"></i>
                          <h2>Available Margin</h2>
                        </div>
                        <div>
                          <h3>0.332 BNB</h3>
                        </div>
                      </li>
                    </ul>
                    <button className="btn green">Deposit</button>
                    <button className="btn red">Withdraw</button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Wallet Deposit Address</h5>
                    <div className="row wallet-address">
                      <div className="col-md-8">
                        <p>
                          Deposits to this address are unlimited. Note that you
                          may not be able to withdraw all of your funds at once
                          if you deposit more than your daily withdrawal limit.
                        </p>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                          />
                          <div className="input-group-prepend">
                            <button className="btn btn-primary">COPY</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img src={"img/qr-code-dark.svg"} alt="qr-code" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Latest Transactions</h5>
                    <div className="wallet-history">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>25-04-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>4.5454334</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>25-05-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>0.5484468</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-06-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>25-07-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>1.45894147</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-08-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="coinTRX" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Balances</h5>
                    <ul>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-cash"></i>
                          <h2>Total Equity</h2>
                        </div>
                        <div>
                          <h3>4.3344 TRX</h3>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-checkmark"></i>
                          <h2>Available Margin</h2>
                        </div>
                        <div>
                          <h3>1.453 TRX</h3>
                        </div>
                      </li>
                    </ul>
                    <button className="btn green">Deposit</button>
                    <button className="btn red">Withdraw</button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Wallet Deposit Address</h5>
                    <div className="row wallet-address">
                      <div className="col-md-8">
                        <p>
                          Deposits to this address are unlimited. Note that you
                          may not be able to withdraw all of your funds at once
                          if you deposit more than your daily withdrawal limit.
                        </p>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                          />
                          <div className="input-group-prepend">
                            <button className="btn btn-primary">COPY</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img src={"img/qr-code-dark.svg"} alt="qr-code" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Latest Transactions</h5>
                    <div className="wallet-history">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>25-04-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>4.5454334</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>25-05-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>0.5484468</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-06-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>25-07-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>1.45894147</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-08-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="coinEOS" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Balances</h5>
                    <ul>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-cash"></i>
                          <h2>Total Equity</h2>
                        </div>
                        <div>
                          <h3>33.35 EOS</h3>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-checkmark"></i>
                          <h2>Available Margin</h2>
                        </div>
                        <div>
                          <h3>4.445 EOS</h3>
                        </div>
                      </li>
                    </ul>
                    <button className="btn green">Deposit</button>
                    <button className="btn red">Withdraw</button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Wallet Deposit Address</h5>
                    <div className="row wallet-address">
                      <div className="col-md-8">
                        <p>
                          Deposits to this address are unlimited. Note that you
                          may not be able to withdraw all of your funds at once
                          if you deposit more than your daily withdrawal limit.
                        </p>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                          />
                          <div className="input-group-prepend">
                            <button className="btn btn-primary">COPY</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img src={"img/qr-code-dark.svg"} alt="qr-code" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Latest Transactions</h5>
                    <div className="wallet-history">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>25-04-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>4.5454334</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>25-05-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>0.5484468</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-06-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>25-07-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>1.45894147</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-08-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="coinXMR" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Balances</h5>
                    <ul>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-cash"></i>
                          <h2>Total Equity</h2>
                        </div>
                        <div>
                          <h3>34.333 XMR</h3>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-checkmark"></i>
                          <h2>Available Margin</h2>
                        </div>
                        <div>
                          <h3>2.354 XMR</h3>
                        </div>
                      </li>
                    </ul>
                    <button className="btn green">Deposit</button>
                    <button className="btn red">Withdraw</button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Wallet Deposit Address</h5>
                    <div className="row wallet-address">
                      <div className="col-md-8">
                        <p>
                          Deposits to this address are unlimited. Note that you
                          may not be able to withdraw all of your funds at once
                          if you deposit more than your daily withdrawal limit.
                        </p>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                          />
                          <div className="input-group-prepend">
                            <button className="btn btn-primary">COPY</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img src={"img/qr-code-dark.svg"} alt="qr-code" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Latest Transactions</h5>
                    <div className="wallet-history">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>25-04-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>4.5454334</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>25-05-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>0.5484468</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-06-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>25-07-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>1.45894147</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-08-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="coinKCS" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Balances</h5>
                    <ul>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-cash"></i>
                          <h2>Total Equity</h2>
                        </div>
                        <div>
                          <h3>86.577 KCS</h3>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="icon ion-md-checkmark"></i>
                          <h2>Available Margin</h2>
                        </div>
                        <div>
                          <h3>5.78 KCS</h3>
                        </div>
                      </li>
                    </ul>
                    <button className="btn green">Deposit</button>
                    <button className="btn red">Withdraw</button>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Wallet Deposit Address</h5>
                    <div className="row wallet-address">
                      <div className="col-md-8">
                        <p>
                          Deposits to this address are unlimited. Note that you
                          may not be able to withdraw all of your funds at once
                          if you deposit more than your daily withdrawal limit.
                        </p>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                          />
                          <div className="input-group-prepend">
                            <button className="btn btn-primary">COPY</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img src={"img/qr-code-dark.svg"} alt="qr-code" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Latest Transactions</h5>
                    <div className="wallet-history">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>25-04-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>4.5454334</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>25-05-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>0.5484468</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-06-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>25-07-2019</td>
                            <td>
                              <i className="icon ion-md-checkmark-circle-outline green"></i>
                            </td>
                            <td>1.45894147</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>25-08-2019</td>
                            <td>
                              <i className="icon ion-md-close-circle-outline red"></i>
                            </td>
                            <td>2.5454545</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Wallet;
