import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import HistoryOrders from "./history/historicalTrades";
import OpenOrders from "./history/openOrders";
import OpenSellOrders from "./history/openSellOrders";

const OrderHistorySection = () => {
  return (
    <div>
      <div className="market-history market-order mt15">
        <Tabs defaultActiveKey="open-orders">
          <Tab eventKey="open-orders" title="Open Buy Orders">
            <OpenOrders />
          </Tab>
          <Tab eventKey="closed-orders" title="Open Sell Orders">
            <OpenSellOrders />
          </Tab>
          <Tab eventKey="order-history" title="Closed Orders">
            <HistoryOrders />
          </Tab>
          {/* <Tab eventKey="balance" title="Balance">
            <ul className="d-flex justify-content-between market-order-item">
              <li>Time</li>
              <li>All pairs</li>
              <li>All Types</li>
              <li>Buy/Sell</li>
              <li>Price</li>
              <li>Amount</li>
              <li>Executed</li>
              <li>Unexecuted</li>
            </ul>
            <span className="no-data">
              <i className="icon ion-md-document"></i>
              No data
            </span>
          </Tab> */}
        </Tabs>
      </div>
    </div>
  );
};

export default OrderHistorySection;
