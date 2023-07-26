import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    pendingOrders: [],
    cryptoMarketPair: "",
    loading: false,
  },
  reducers: {
    addPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    clearPendingOrders: (state, action) => {
      state.pendingOrders = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCryptoMarketPair: (state, action) => {
      state.cryptoMarketPair = action.payload;
    },
  },
});

export const {
  addPendingOrders,
  setLoading,
  clearPendingOrders,
  setCryptoMarketPair,
} = orderSlice.actions;

export const getPendingOrders = (pair) => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();
  let cancelToken;

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  dispatch(setLoading(true));

  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/trade/tactiveOrders`,
      {
        customerId: user?.walletCustomerId,
        pair: pair,
      },
      config
    );

    if (status === 200) {
      dispatch(addPendingOrders(data));
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export default orderSlice.reducer;
