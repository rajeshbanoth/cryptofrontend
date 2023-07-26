import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    baseCurrency: "INR",
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addUserData: (state, action) => {
      state.user = action.payload;
    },
    updateBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    updateKycData: (state, action) => {
      state.user.kycVerifyStatus = action.payload;
    },
    updateUserBankStatus: (state, action) => {
      state.user.bankVerifyStatus = action.payload;
    },
  },
});

export const {
  addUser,
  addUserData,
  updateBaseCurrency,
  updateKycData,
  updateUserBankStatus,
} = authSlice.actions;

export default authSlice.reducer;
