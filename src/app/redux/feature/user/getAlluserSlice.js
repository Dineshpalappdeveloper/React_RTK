import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "./userApi";

export const getAllusers = createAsyncThunk(
  "user/getAllUsers",
  async (token, thankAPI) => {
    try {
      console.log(token, "tokenslice");
      const response = await userApi.getAlluserApi(token);
      if (!response) {
        return thankAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thankAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  isLoading: false,
  isError: false,
  userData: null,
};
const getAllUserSlice = createSlice({
  name: "getalluser",
  initialState,
  reducers: {
    resertState: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllusers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getAllusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
      });
  },
});

export const { resertState } = getAllUserSlice.actions;
export const getalluser = (state) => state.getalluser;
export default getAllUserSlice.reducer;
