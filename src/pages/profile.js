import React, { useEffect } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  BankSection,
  KycSection,
  OrderHistorySection,
  ProfileSection,
  SettingsSection,
  WalletSection,
} from "../components/profile";
import { getUserWalletInfo } from "../redux/slice/walletSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserWalletInfo());
  }, [dispatch]);

  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <Tab.Container defaultActiveKey="profile">
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
                  <Nav.Item>
                    <Nav.Link eventKey="kyc">Kyc</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="bank">Bank details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="order">Order / History</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <ProfileSection />
                  </Tab.Pane>
                  <Tab.Pane eventKey="wallet">
                    <WalletSection />
                  </Tab.Pane>
                  <Tab.Pane eventKey="settings">
                    <SettingsSection />
                  </Tab.Pane>
                  <Tab.Pane eventKey="kyc">
                    <KycSection />
                  </Tab.Pane>
                  <Tab.Pane eventKey="bank">
                    <BankSection />
                  </Tab.Pane>
                  <Tab.Pane eventKey="order">
                    <OrderHistorySection />
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
