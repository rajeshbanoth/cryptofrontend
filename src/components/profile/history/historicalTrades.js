import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { getUserWalletInfo } from "../../../redux/slice/walletSlice";
// import { Pagination } from "react-bootstrap";

const SingleActiveOrder = ({ dateString, order, index }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("open");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setStatus("open");
  }, [order]);

  const cancelOrderHandler = async (orderId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/trade/tcancelOrder/${orderId}`,
        config
      );

      setStatus("cancel");
      dispatch(getUserWalletInfo());
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ul
      key={index}
      style={{
        backgroundColor: status === "cancel" && "rgba(255, 0, 0 , 0.3)",
      }}
      className="d-flex justify-content-between market-order-item"
    >
      <li>
        <p style={{ margin: "0" }}>
          {moment(dateString).format("MMM Do YYYY")}{" "}
        </p>
        <p>{moment(dateString).format("h:mm a")}</p>
      </li>
      <li>{order?.pair?.replace("4", "").replace("VC_", "")}</li>
      <li>All Types</li>
      <li>{order.type}</li>
      <li>{order?.price}</li>
      <li>{order?.amount}</li>
      {/* <li>
        {status !== "cancel" && (
          <button
            onClick={() => cancelOrderHandler(order?.id)}
            className="btn btn-danger btn-sm"
          >
            Cancel
          </button>
        )}
      </li> */}
    </ul>
  );
};

const Pagination = ({ page, pages, changePage }) => {
  return (
    pages > 1 && (
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => changePage((page) => page - 1)}
          className="pagination_prev"
        >
          &#171;
        </button>
        {page}
        <button
          disabled={page === pages}
          onClick={() => changePage((page) => page + 1)}
          className="pagination_next"
        >
          &#187;
        </button>
      </div>
    )
  );
};

const HistoryOrders = () => {
  const { user } = useSelector((state) => state.auth);

  console.log("user", user);

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  const [activeOrders, setActiveOrders] = useState([]);

  useEffect(() => {
    const fetchActiveOrders = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const payload = {
        customerId: user?.walletCustomerId,
        offset: currentPage,
        page: currentPage,
      };

      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + `/trade/tallClosedOrders`,
          payload,
          config
        );

        setActiveOrders(data?.pendingOrders);
        setCount(data?.count);
        setPages(data?.pages);
      } catch (error) {
        toast.error(error.response.data.errors[0].message, {
          position: toast.POSITION.TOP_RIGHT,
          showProgressBar: false,
        });
      }
    };

    fetchActiveOrders();
  }, [currentPage]);

  return (
    <div>
      <ul className="d-flex justify-content-between market-order-item">
        <li className="d-flex">Time</li>
        <li>All pairs</li>
        <li>All Types</li>
        <li>Buy/Sell</li>
        <li>Price</li>
        <li>Amount</li>
      </ul>
      {activeOrders.length > 0 ? (
        <>
          {activeOrders.map((order, index) => {
            const dateString = moment(order.created).toDate();
            return (
              <>
                <SingleActiveOrder
                  index={index}
                  order={order}
                  dateString={dateString}
                />
              </>
            );
          })}

          <Pagination
            page={currentPage}
            pages={pages}
            changePage={setCurrentPage}
          />
          {/* <Pagination> */}
          {/* {true ? (
              <>
                <Pagination.Item onClick={() => paginate(currentPage)}>
                  {currentPage - 1}
                </Pagination.Item>
              </>
            ) : null}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {true ? (
              <>
                <Pagination.Item onClick={() => paginate(currentPage)}>
                  {currentPage + 1}
                </Pagination.Item>
              </>
            ) : null} */}
          {/* </Pagination> */}
        </>
      ) : (
        <span className="no-data">
          <i className="icon ion-md-document"></i>
          No data
        </span>
      )}
    </div>
  );
};

export default HistoryOrders;
