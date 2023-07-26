import { createSlice } from "@reduxjs/toolkit";

const bankSlice = createSlice({
  name: "bank",
  initialState: {
    upi_id:'',
    bankAccountData:[],
    panKycData:[],
    aadharKycData:[]
  },
  reducers: {
    setUpi_Id: (state, action) => {
      state.upi_id = action.payload;
    },
    setBankAccountData:(state, action) => {
      state.bankAccountData = action.payload;
    },
    setPanKycData:(state, action) => {
      state.panKycData = action.payload;
    },
    setAadharKycData:(state, action) => {
      state.aadharKycData = action.payload;
    },
  },
});

export const { setUpi_Id ,setBankAccountData,setPanKycData,setAadharKycData} = bankSlice.actions;

export default bankSlice.reducer;
