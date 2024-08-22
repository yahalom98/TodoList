import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.status = "loading";
    },
    fetchDataSuccess(state, action) {
      state.status = "succeeded";
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  apiSlice.actions;

export default apiSlice.reducer;
