import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";

const WalletItem = ({ wallet, walletSelected }) => {
  const { user } = useSelector((state) => state.auth);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getDepositAddress = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        };

        let path = "tgenerateDeposit";

        // if (wallet?.currency === "SOL") {
        //   path =  "tgenerateSolAddress";
        // }

        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/wallet/${path}/${wallet?.id}`,
          config
        );

        setAddress(data);
      } catch (error) {}
    };

    getDepositAddress();
  }, [wallet]);

  return (
    <div
      className={`tab-pane fade ${
        walletSelected === wallet?.currency && "show active"
      }`}
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
                <h3>
                  {parseFloat(wallet?.balance?.accountBalance).toFixed(6)}{" "}
                  {wallet?.currency}
                </h3>
              </div>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="icon ion-md-checkmark"></i>
                <h2>Available Margin</h2>
              </div>
              <div>
                <h3>
                  {parseFloat(wallet?.balance?.availableBalance).toFixed(6)}{" "}
                  {wallet?.currency}
                </h3>
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
                Deposits to this address are unlimited. Note that you may not be
                able to withdraw all of your funds at once if you deposit more
                than your daily withdrawal limit.
              </p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={address?.address}
                />
                <div className="input-group-prepend">
                  <button className="btn btn-primary">COPY</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              {address?.address && (
                <QRCode size={128} value={address?.address} />
              )}
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
  );
};

export default WalletItem;
