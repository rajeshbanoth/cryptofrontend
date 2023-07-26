import React, { useEffect, useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { ThemeConsumer } from "../context/ThemeContext";
import siteConfig from "../siteConfig";
import axios from "axios";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
export default function Wallet() {
  const [walletlist, setwalletlist] = useState([]);
  const [accountBalance, setaccountBalance] = useState(null);
  const [availableBalance, setavailablebalance] = useState(null);
  const [walletid, setwalletid] = useState(null);
  const [show, setShow] = useState(false);
  const [despositaddress, setdepositadress] = useState("");

  const userdata = JSON.parse(localStorage.getItem("userinfo"));

  const handlewalletdata = (item) => {
    setaccountBalance(item.balance.accountBalance);
    setavailablebalance(item.balance.availableBalance);
    setwalletid(item.id);

    const config = {
      headers: {
        Authorization: `Bearer ${userdata.token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(siteConfig.baseurl + `/wallet/tgenerateDeposit/${item.id}`, config)
      .then((res) => {
        console.log(res);

        if (res.status === 200 && res.statusText === "OK") {
          setdepositadress(res.data.address);
        }
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userdata.token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(siteConfig.baseurl + `/wallet/tgenerateDeposit/${walletid}`, config)
      .then((res) => {
        console.log(res);

        if (res.status === 200 && res.statusText === "OK") {
          setdepositadress(res.data.address);
        }
      });
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userdata.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    axios.get(siteConfig.baseurl + "/wallet/tdetails", config).then((res) => {
      console.log(res);

      if (res.status === 200 && res.statusText === "OK") {
        setwalletlist(res.data);
      }
    });
  }, []);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <QRCode value={despositaddress} />
          </div>
          {despositaddress}
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

      <div className="settings mtb15">
        <div className="container-fluid">
          <Tab.Container defaultActiveKey="wallet">
            <Row>
              <Col lg={3}>
                <Nav variant="pills" className="settings-nav">
                  <Nav.Item>
                    <Nav.Link eventKey="profile">Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wallet">Wallet</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings">Settings</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">General Information</h5>
                        <div className="settings-profile">
                          <form>
                            <img src={"img/avatar.svg"} alt="avatar" />
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="fileUpload"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="fileUpload"
                              >
                                Choose avatar
                              </label>
                            </div>
                            <div className="form-row mt-4">
                              <div className="col-md-6">
                                <label htmlFor="formFirst">First name</label>
                                <input
                                  id="formFirst"
                                  type="text"
                                  className="form-control"
                                  placeholder="First name"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="formLast">Last name</label>
                                <input
                                  id="formLast"
                                  type="text"
                                  className="form-control"
                                  placeholder="Last name"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="emailAddress">Email</label>
                                <input
                                  id="emailAddress"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your email"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="phoneNumber">Phone</label>
                                <input
                                  id="phoneNumber"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter phone number"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="selectLanguage">Language</label>
                                <select
                                  id="selectLanguage"
                                  className="custom-select"
                                >
                                  <option defaultValue>English</option>
                                  <option>Mandarin Chinese</option>
                                  <option>Spanish</option>
                                  <option>Arabic</option>
                                  <option>Russian</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="selectCurrency">Currency</label>
                                <select
                                  id="selectCurrency"
                                  className="custom-select"
                                >
                                  <option defaultValue>USD</option>
                                  <option>EUR</option>
                                  <option>GBP</option>
                                  <option>CHF</option>
                                </select>
                              </div>
                              <div className="col-md-12">
                                <input type="submit" value="Update" />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Security Information</h5>
                        <div className="settings-profile">
                          <form>
                            <div className="form-row">
                              <div className="col-md-6">
                                <label htmlFor="currentPass">
                                  Current password
                                </label>
                                <input
                                  id="currentPass"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your password"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="newPass">New password</label>
                                <input
                                  id="newPass"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter new password"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="securityOne">
                                  Security questions #1
                                </label>
                                <select
                                  id="securityOne"
                                  className="custom-select"
                                >
                                  <option defaultValue>
                                    What was the name of your first pet?
                                  </option>
                                  <option>
                                    What's your Mother's middle name?
                                  </option>
                                  <option>
                                    What was the name of your first school?
                                  </option>
                                  <option>
                                    Where did you travel for the first time?
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="securityAnsOne">Answer</label>
                                <input
                                  id="securityAnsOne"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your answer"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="securityTwo">
                                  Security questions #2
                                </label>
                                <select
                                  id="securityTwo"
                                  className="custom-select"
                                >
                                  <option defaultValue>Choose...</option>
                                  <option>
                                    What was the name of your first pet?
                                  </option>
                                  <option>
                                    What's your Mother's middle name?
                                  </option>
                                  <option>
                                    What was the name of your first school?
                                  </option>
                                  <option>
                                    Where did you travel for the first time?
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="securityAnsTwo">Answer</label>
                                <input
                                  id="securityAnsTwo"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your answer"
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="securityThree">
                                  Security questions #3
                                </label>
                                <select
                                  id="securityThree"
                                  className="custom-select"
                                >
                                  <option defaultValue>Choose...</option>
                                  <option>
                                    What was the name of your first pet?
                                  </option>
                                  <option>
                                    What's your Mother's middle name?
                                  </option>
                                  <option>
                                    What was the name of your first school?
                                  </option>
                                  <option>
                                    Where did you travel for the first time?
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="securityFore">Answer</label>
                                <input
                                  id="securityFore"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your answer"
                                />
                              </div>
                              <div className="col-md-12">
                                <input type="submit" value="Update" />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="wallet">
                    <div className="wallet">
                      <Row>
                        <Col lg={4}>
                          <Nav variant="pills" className="settings-nav">
                            {walletlist.length > 0 && (
                              <>
                                {" "}
                                {walletlist.map((item) => (
                                  <Nav.Item
                                    onClick={() => handlewalletdata(item)}
                                  >
                                    <Nav.Link
                                      eventKey={
                                        `wallet_item_` +
                                        item.currency.toUpperCase()
                                      }
                                      className="d-flex justify-content-between align-items-center"
                                    >
                                      <div className="d-flex">
                                        <img src={"img/icon/6.png"} alt="btc" />
                                        <div>
                                          <h2>{item.currency}</h2>
                                          <p>{item.currency}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h3>{item.balance.accountBalance}</h3>
                                        <p className="text-right">
                                          <i className="icon ion-md-lock"></i>{" "}
                                          {item.balance.availableBalance}
                                        </p>
                                      </div>
                                    </Nav.Link>
                                  </Nav.Item>
                                ))}
                              </>
                            )}
                          </Nav>
                        </Col>

                        <Col lg={8}>
                          <div className="tab-content">
                            <div
                              className="tab-pane fade show active"
                              id="coinBTC"
                              role="tabpanel"
                            >
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
                                        <h3>{accountBalance}BTC</h3>
                                      </div>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center">
                                        <i className="icon ion-md-checkmark"></i>
                                        <h2>Available Margin</h2>
                                      </div>
                                      <div>
                                        <h3>{availableBalance}BTC</h3>
                                      </div>
                                    </li>
                                  </ul>
                                  <button
                                    className="btn green"
                                    onClick={handleShow}
                                  >
                                    {" "}
                                    Deposit
                                  </button>
                                  <button className="btn red">Withdraw</button>
                                </div>
                              </div>
                              <div className="card">
                                <div className="card-body">
                                  <h5 className="card-title">
                                    Wallet Deposit Address
                                  </h5>
                                  <div className="row wallet-address">
                                    <div className="col-md-8">
                                      <p>
                                        Deposits to this address are unlimited.
                                        Note that you may not be able to
                                        withdraw all of your funds at once if
                                        you deposit more than your daily
                                        withdrawal limit.
                                      </p>
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={despositaddress}
                                        />
                                        <div className="input-group-prepend">
                                          <button className="btn btn-primary">
                                            COPY
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      {/* <ThemeConsumer>
                                        {({ data }) => {
                                          return data.theme === 'light' ? (
                                            <img
                                              src={'img/qr-code-dark.svg'}
                                              alt="qr-code"
                                            />
                                          ) : (
                                            <img
                                              src={'img/qr-code-light.svg'}
                                              alt="qr-code"
                                            /> */}

                                      {/* );
                                        }}
                                      </ThemeConsumer> */}
                                      <QRCode value={despositaddress} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card">
                                <div className="card-body">
                                  <h5 className="card-title">
                                    Latest Transactions
                                  </h5>
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
                  </Tab.Pane>
                  <Tab.Pane eventKey="settings">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Notifications</h5>
                        <div className="settings-notification">
                          <ul>
                            <li>
                              <div className="notification-info">
                                <p>Update price</p>
                                <span>
                                  Get the update price in your dashboard
                                </span>
                              </div>
                              <div className="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="notification1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="notification1"
                                ></label>
                              </div>
                            </li>
                            <li>
                              <div className="notification-info">
                                <p>2FA</p>
                                <span>
                                  Unable two factor authentication service
                                </span>
                              </div>
                              <div className="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="notification2"
                                  checked
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="notification2"
                                ></label>
                              </div>
                            </li>
                            <li>
                              <div className="notification-info">
                                <p>Latest news</p>
                                <span>Get the latest news in your mail</span>
                              </div>
                              <div className="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="notification3"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="notification3"
                                ></label>
                              </div>
                            </li>
                            <li>
                              <div className="notification-info">
                                <p>Email Service</p>
                                <span>Get security code in your mail</span>
                              </div>
                              <div className="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="notification4"
                                  checked
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="notification4"
                                ></label>
                              </div>
                            </li>
                            <li>
                              <div className="notification-info">
                                <p>Phone Notify</p>
                                <span>
                                  Get transition notification in your phone{" "}
                                </span>
                              </div>
                              <div className="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="notification5"
                                  checked
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="notification5"
                                ></label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card settings-profile">
                      <div className="card-body">
                        <h5 className="card-title">Create API Key</h5>
                        <div className="form-row">
                          <div className="col-md-6">
                            <label htmlFor="generateKey">
                              Generate key name
                            </label>
                            <input
                              id="generateKey"
                              type="text"
                              className="form-control"
                              placeholder="Enter your key name"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="rewritePassword">
                              Confirm password
                            </label>
                            <input
                              id="rewritePassword"
                              type="password"
                              className="form-control"
                              placeholder="Confirm your password"
                            />
                          </div>
                          <div className="col-md-12">
                            <input type="submit" value="Create API key" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Your API Keys</h5>
                        <div className="wallet-history">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Key</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>zRmWVcrAZ1C0RZkFMu7K5v0KWC9jUJLt</td>
                                <td>
                                  <div className="custom-control custom-switch">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="apiStatus1"
                                      checked
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="apiStatus1"
                                    ></label>
                                  </div>
                                </td>
                                <td>
                                  <i className="icon ion-md-trash"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Rv5dgnKdmVPyHwxeExBYz8uFwYQz3Jvg</td>
                                <td>
                                  <div className="custom-control custom-switch">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="apiStatus2"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="apiStatus2"
                                    ></label>
                                  </div>
                                </td>
                                <td>
                                  <i className="icon ion-md-trash"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>VxEYIs1HwgmtKTUMA4aknjSEjjePZIWu</td>
                                <td>
                                  <div className="custom-control custom-switch">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="apiStatus3"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="apiStatus3"
                                    ></label>
                                  </div>
                                </td>
                                <td>
                                  <i className="icon ion-md-trash"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>M01DueJ4x3awI1SSLGT3CP1EeLSnqt8o</td>
                                <td>
                                  <div className="custom-control custom-switch">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="apiStatus4"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="apiStatus4"
                                    ></label>
                                  </div>
                                </td>
                                <td>
                                  <i className="icon ion-md-trash"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}
