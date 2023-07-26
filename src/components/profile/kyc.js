import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Nav, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateKycData } from "../../redux/slice/authSlice";
import { setLoading } from "../../redux/slice/walletSlice";

const KycSection = () => {
  const dispatch = useDispatch();
  // const [kycVerifyStatus, setKycVerifyStatus] = useState("NOT_VERIFIED");

  const { user } = useSelector((state) => state.auth);

  const [aadharNo, setAadharNo] = useState("");
  const [panCardNo, setPanCardNo] = useState("");

  const [adhaarFrontImage, setAdhaarFrontImage] = useState("");
  const [adhaarImagePreview, setAdhaarFrontImagePreview] = useState("");
  const [isAdhaarUploaded, setIsAdhaarFrontUploaded] = useState(false);

  const [adhaarBackImage, setAdhaarBackImage] = useState("");
  const [adhaarBackImagePreview, setAdhaarBackImagePreview] = useState("");
  const [isAdhaarBackUploaded, setIsAdhaarBackUploaded] = useState(false);

  const [panCardImage, setPanCardImage] = useState("");
  const [panImagePreview, setPanImagePreview] = useState("");
  const [isPanCardUploaded, setIsPanCardUploaded] = useState(false);

  const [selfieImage, setSelfieImage] = useState("");
  const [selfieImagePreview, setSelfieImagePreview] = useState("");
  const [isSelfieUploaded, setIsSelfieUploaded] = useState(false);

  // const fetchKycDetails = async () => {
  //   try {
  //     const config = {
  //       headers: { Authorization: `Bearer ${user?.token}` },
  //     };
  //     const { data, status } = await axios.get(
  //       process.env.REACT_APP_SERVER_URL + "/kyc/kycDetails",
  //       config
  //     );

  //     // Preview aadhar front view
  //     setAdhaarFrontImagePreview(data.aadharImageFront);
  //     setIsAdhaarFrontUploaded(true);

  //     // Preview aadhar back view
  //     setAdhaarBackImagePreview(data.aadharImageBack);
  //     setIsAdhaarBackUploaded(true);

  //     // Preview Pan view
  //     setPanImagePreview(data.panCardImage);
  //     setIsPanCardUploaded(true);

  //     // Preview Selfie view
  //     setSelfieImagePreview(data.selfieImage);
  //     setIsSelfieUploaded(true);

  //     // Set aadhar no and Pan Card no
  //     setAadharNo(data?.aadharNo);
  //     setPanCardNo(data?.panNo);

  //     // set Verification Status
  //     dispatch(updateKycData(data.verificationStatus));
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   fetchKycDetails();
  // }, []);

  const submitKycDetails = async (e) => {
    e.preventDefault();

    if (
      aadharNo === "" &&
      panCardNo === "" &&
      adhaarBackImage === "" &&
      adhaarFrontImage === "" &&
      panCardImage === "" &&
      selfieImage === ""
    ) {
      toast.error("Please fill the required fields", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
      return;
    }

    if (aadharNo.length !== 12) {
      toast.error("Adhaar card should have 12 digits", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
      return;
    }

    if (panCardNo.length !== 10) {
      toast.error("Pan card should have 10 digits", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    let formData = new FormData();
    formData.append("aadharFrontImage", adhaarFrontImage);
    formData.append("aadharBackImage", adhaarBackImage);
    formData.append("panCardImage", panCardImage);
    formData.append("selfieImage", selfieImage);
    formData.append("panNo", panCardNo.toString());
    formData.append("aadharNo", aadharNo.toString());

    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/kyc/kycDetails",
        formData,
        config
      );

      if (data.message) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          showProgressBar: false,
        });
      }
      dispatch(setLoading(false));

      const userDetails = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/user/details",
        config
      );

      dispatch(updateKycData(userDetails?.data?.kycVerifyStatus));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      if (type === "ADHAAR_FRONT") setAdhaarFrontImage(e.target.files[0]);
      if (type === "ADHAAR_BACK") setAdhaarBackImage(e.target.files[0]);
      if (type === "PAN_CARD") setPanCardImage(e.target.files[0]);
      if (type === "SELFIE") setSelfieImage(e.target.files[0]);

      reader.onloadend = function () {
        if (type === "ADHAAR_FRONT") {
          setAdhaarFrontImagePreview(reader.result);
          setIsAdhaarFrontUploaded(true);
        }

        if (type === "ADHAAR_BACK") {
          setAdhaarBackImagePreview(reader.result);
          setIsAdhaarBackUploaded(true);
        }
        if (type === "PAN_CARD") {
          setPanImagePreview(reader.result);
          setIsPanCardUploaded(true);
        }
        if (type === "SELFIE") {
          setSelfieImagePreview(reader.result);
          setIsSelfieUploaded(true);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="wallet">
      {user?.kycVerifyStatus === "PENDING" && (
        <>
          <Card>
            <Card.Title>
              <h1 className="p-3">Your documents are under review</h1>
            </Card.Title>
          </Card>{" "}
        </>
      )}
      <>
        {user?.kycVerifyStatus === "NOT_VERIFIED" && (
          <>
            <form onSubmit={submitKycDetails}>
              <div className="card">
                <div className="card-body">
                  <h3 className="">Please Upload your Adhaar Card</h3>
                  <Row>
                    <Col lg={6}>
                      <div className="m-3">
                        {!isAdhaarUploaded ? (
                          <>
                            <div>
                              <label htmlFor="upload-input-1">
                                <div className="flex justify-center bg-slate-50 items-center h-24 border-gray-200 cursor-pointer border rounded-md">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black-50"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </div>

                                <p className="mt-2">
                                  Click to upload Aadhar front side.
                                </p>
                              </label>
                              <input
                                id="upload-input-1"
                                className="hidden"
                                style={{ visibility: "hidden" }}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageChange(e, "ADHAAR_FRONT")
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <div>
                            {user?.kycVerifyStatus === "NOT_VERIFIED" && (
                              <div className="flex justify-end">
                                <svg
                                  style={{
                                    height: "1.2rem",
                                    width: "1.2rem",
                                    cursor: "pointer",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=""
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  onClick={() => {
                                    setAdhaarFrontImagePreview("");
                                    setIsAdhaarFrontUploaded(false);
                                    setAdhaarFrontImage("");
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                            )}
                            <img
                              alt="uploaded-img"
                              className="object-cover"
                              src={adhaarImagePreview}
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="m-3">
                        {!isAdhaarBackUploaded ? (
                          <>
                            <div>
                              <label htmlFor="upload-input-back-1">
                                <div className="flex justify-center bg-slate-50 items-center h-24 border-gray-200 cursor-pointer border rounded-md">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black-50"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </div>
                                <p className="mt-2">
                                  Click to upload Aadhar back side.
                                </p>
                              </label>
                              <input
                                id="upload-input-back-1"
                                className="hidden"
                                style={{ visibility: "hidden" }}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageChange(e, "ADHAAR_BACK")
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <div>
                            {user?.kycVerifyStatus === "NOT_VERIFIED" && (
                              <div className="flex justify-end">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 cursor-pointer"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  style={{
                                    height: "1.2rem",
                                    width: "1.2rem",
                                    cursor: "pointer",
                                  }}
                                  stroke="currentColor"
                                  onClick={() => {
                                    setAdhaarBackImagePreview("");
                                    setIsAdhaarBackUploaded(false);
                                    setAdhaarBackImage("");
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                            )}
                            <img
                              alt="uploaded-img"
                              className="object-cover"
                              src={adhaarBackImagePreview}
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="ml-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter your adhaar card no"
                          required
                          value={aadharNo}
                          onChange={(e) => {
                            setAadharNo(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Row>
                    <Col lg={6}>
                      <div className="m-3">
                        <h3 className="mb-3">Please Upload your Pan Card</h3>
                        {!isPanCardUploaded ? (
                          <>
                            <div>
                              <label htmlFor="upload-input-1">
                                <div className="flex justify-center bg-slate-50 items-center h-24 border-gray-200 cursor-pointer border rounded-md">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black-50"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </div>

                                <p className="mt-2">
                                  Click to upload pan card photo.
                                </p>
                              </label>
                              <input
                                id="upload-input-1"
                                className="hidden"
                                style={{ visibility: "hidden" }}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageChange(e, "PAN_CARD")
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <div>
                            {user?.kycVerifyStatus === "NOT_VERIFIED" && (
                              <div className="flex justify-end">
                                <svg
                                  style={{
                                    height: "1.2rem",
                                    width: "1.2rem",
                                    cursor: "pointer",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=""
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  onClick={() => {
                                    setPanImagePreview("");
                                    setIsPanCardUploaded(false);
                                    setPanCardImage("");
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                            )}
                            <img
                              alt="uploaded-img"
                              className="object-cover"
                              src={panImagePreview}
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="m-3">
                        <h3 className="mb-3">Please Upload your Selfie</h3>
                        {!isSelfieUploaded ? (
                          <>
                            <div>
                              <label htmlFor="upload-input-back-1">
                                <div className="flex justify-center bg-slate-50 items-center h-24 border-gray-200 cursor-pointer border rounded-md">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-black-50"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </div>
                                <p className="mt-2">
                                  Click to upload selfie photo.
                                </p>
                              </label>
                              <input
                                id="upload-input-back-1"
                                className="hidden"
                                style={{ visibility: "hidden" }}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "SELFIE")}
                              />
                            </div>
                          </>
                        ) : (
                          <div>
                            {user?.kycVerifyStatus === "NOT_VERIFIED" && (
                              <div className="flex justify-end">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 cursor-pointer"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  style={{
                                    height: "1.2rem",
                                    width: "1.2rem",
                                    cursor: "pointer",
                                  }}
                                  stroke="currentColor"
                                  onClick={() => {
                                    setSelfieImagePreview("");
                                    setIsSelfieUploaded(false);
                                    setSelfieImage("");
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                            )}
                            <img
                              alt="uploaded-img"
                              className="object-cover"
                              src={selfieImagePreview}
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="ml-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your pan card no"
                          required
                          value={panCardNo}
                          onChange={(e) => {
                            setPanCardNo(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              {user?.kycVerifyStatus !== "PENDING" && (
                <button
                  type="submit"
                  disabled={
                    isAdhaarUploaded &&
                    isAdhaarBackUploaded &&
                    isPanCardUploaded &&
                    isSelfieUploaded &&
                    panCardNo !== "" &&
                    aadharNo !== ""
                      ? false
                      : true
                  }
                  className="btn btn-primary"
                >
                  Submit
                </button>
              )}
            </form>
          </>
        )}
      </>
      <>
        {user?.kycVerifyStatus === "VERIFIED" && (
          <>
            <Card>Kyc verified</Card>
          </>
        )}
      </>
    </div>
  );
};

export default KycSection;
