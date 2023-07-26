import React from "react";

const Settings = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Notifications</h5>
          <div className="settings-notification">
            <ul>
              <li>
                <div className="notification-info">
                  <p>Update price</p>
                  <span>Get the update price in your dashboard</span>
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
                  <span>Unable two factor authentication service</span>
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
                  <span>Get transition notification in your phone </span>
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
              <label htmlFor="generateKey">Generate key name</label>
              <input
                id="generateKey"
                type="text"
                className="form-control"
                placeholder="Enter your key name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="rewritePassword">Confirm password</label>
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
    </>
  );
};

export default Settings;
