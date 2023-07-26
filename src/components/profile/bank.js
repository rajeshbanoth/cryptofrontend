import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Nav, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  updateKycData,
  updateUserBankStatus,
} from "../../redux/slice/authSlice";
import { setLoading } from "../../redux/slice/walletSlice";

const BankSection = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [reAccountNumber, setReAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const submitBankDetails = async (e) => {
    e.preventDefault();
    if (
      accountHolderName === "" ||
      accountNumber === "" ||
      reAccountNumber === "" ||
      ifscCode === ""
    ) {
      toast.error("Please enter all required details", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
      return;
    }

    if (accountNumber !== reAccountNumber) {
      toast.error("Account and ReAccount fields do not match", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
      return;
    }

    // if (ifscCode.length !== 12) {
    //   toast.error("Ifsc code should have 12 digits", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     showProgressBar: false,
    //   });
    //   return;
    // }

    const payload = {
      accountHolderName: accountHolderName,
      accountNumber: accountNumber,
      reAccountNumber: reAccountNumber,
      ifscCode: ifscCode,
      email: user?.email,
      phone: user?.phone,
      userId: user?.id,
    };

    // let formData = new FormData();
    // formData.append("accountHolderName", accountHolderName);
    // formData.append("accountNumber", accountNumber);
    // formData.append("reAccountNumber", reAccountNumber);
    // formData.append("ifscCode", ifscCode);
    // formData.append("email", user?.email);
    // formData.append("userId", user?.id);
    // formData.append("phone", user?.phone);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/bank/add`,
        payload,
        config
      );

      dispatch(updateUserBankStatus(data?.verifyBankStatus));

      toast.success("Bank account successfully added", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });

      dispatch(setLoading(false));
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.errors[0].message, {
          position: toast.POSITION.TOP_RIGHT,
          showProgressBar: false,
        });
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="wallet">
      {user?.kycVerifyStatus === "NOT_VERIFIED" && (
        <>
          <Card>
            <Card.Title>
              <h1 className="p-3">
                Please verify your kyc before adding your bank details
              </h1>
            </Card.Title>
          </Card>
        </>
      )}
      {user?.kycVerifyStatus === "PENDING" && (
        <>
          <Card>
            <Card.Title>
              <h1 className="p-3">
                Please verify your kyc before adding your bank details
              </h1>
            </Card.Title>
          </Card>
        </>
      )}

      {user?.kycVerifyStatus === "VERIFIED" && (
        <>
          {user?.bankVerifyStatus === "NOT_VERIFIED" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add Bank Details</h5>

                <div className="settings-profile">
                  <form onSubmit={submitBankDetails}>
                    <div className="form-row mt-4">
                      <div className="col-md-6">
                        <label htmlFor="formFirst">Account Holder Name</label>
                        <input
                          id="formFirst"
                          type="text"
                          onChange={(e) => setAccountHolderName(e.target.value)}
                          className="form-control"
                          placeholder="Enter account holder name"
                          value={accountHolderName}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="formFirst">Account Number</label>
                        <input
                          id="formFirst"
                          type="text"
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="form-control"
                          placeholder="Enter account number"
                          value={accountNumber}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="formLast">
                          Re-Enter Account Number
                        </label>
                        <input
                          id="formLast"
                          type="text"
                          className="form-control"
                          placeholder="Re-enter account number"
                          value={reAccountNumber}
                          onChange={(e) => setReAccountNumber(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="emailAddress">IFSC CODE</label>
                        <input
                          id="emailAddress"
                          type="text"
                          className="form-control"
                          placeholder="Enter IFSC code"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <input type="submit" value="Add" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {user?.bankVerifyStatus === "PENDING" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Thank you for submitting your bank details. We will process
                  and verify within 24hrs.
                </h5>
              </div>
            </div>
          )}
          {user?.bankVerifyStatus === "VERIFIED" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bank verified</h5>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BankSection;
