import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    loading: false,
    walletInfo: null,
  },
  reducers: {
    addWalletInfo: (state, action) => {
      state.walletInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addWalletInfo, setLoading } = walletSlice.actions;

export const getUserWalletInfo = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  dispatch(setLoading(true));

  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/wallet/tdetails`,
      config
    );

    if (status === 200) {
      dispatch(addWalletInfo(data));
    }

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export default walletSlice.reducer;
