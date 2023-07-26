import axios from "axios";
import { useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserWalletInfo, setLoading } from "../redux/slice/walletSlice";

export default function useDepositWithdraw({ setShow }) {
  const dispatch = useDispatch();
  const Razorpay = useRazorpay();
  const [open, setOpen] = useState(false);
  const [withdrawOpen, setwithdrawOpen] = useState(false);

  //   const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const { walletInfo } = useSelector((state) => state.wallet);

  const handleOpenModal = (value) => {
    setOpen(value);
  };

  const handleWithdrawOpenModal = (value) => {
    setwithdrawOpen(value);
  };

  const handleWithraw = async (accountId, value) => {
    const data = {
      amount: parseInt(value),
      userId: user?.id,
      accountId: accountId,
    };
    //   await callApi.Calls(`payment/updateWallet`, "POST", data);
    //   //  Create order on your backend
    //   getWalletbalance();
    dispatch(setLoading(true));
    setShow(false);
    try {
      const updateWallet = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/payment/razorpayWithdraw`,
        data,
        config
      );
      dispatch(setLoading(false));
      dispatch(getUserWalletInfo());

      toast.success("The amount has been credited to your account", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
    } catch (error) {
      toast.error("Failed to process. Please try again later", {
        position: toast.POSITION.TOP_RIGHT,
        showProgressBar: false,
      });
      dispatch(setLoading(false));
    }
  };

  const handlePayment = async ({ depositAmount, inrBalance, accountId }) => {
    const data = {
      amount: depositAmount,
    };

    dispatch(setLoading(true));
    try {
      const order = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/payment/createOrder`,
        data,
        config
      ); //  Create order on your backend

      dispatch(setLoading(false));

      const options = {
        key: "rzp_test_N7DmxNEFQcl5b6", // Enter the Key ID generated from the Dashboard
        amount: data?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Pyxkrypto",
        description: "Test Transaction",
        // image: "https://example.com/your_logo",
        order_id: order?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response) {
          const data = {
            amount: parseFloat(depositAmount).toFixed(2),
            accountId: accountId,
            orderId: order?.data?.id,
          };
          try {
            const updateWallet = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/payment/tdeposit`,
              data,
              config
            );
            toast.success("Your amount is deposited successfully", {
              position: toast.POSITION.TOP_RIGHT,
              showProgressBar: false,
            });
            // await callApi.Calls(`updateWallet`, "POST", data); //  Create order on your backend
            dispatch(getUserWalletInfo());
          } catch (error) {}
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return {
    open,
    setOpen,
    withdrawOpen,
    handleOpenModal,
    handlePayment,
    handleWithdrawOpenModal,
    handleWithraw,
    setwithdrawOpen,
  };
}
