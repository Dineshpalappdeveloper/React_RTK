import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "./userApi";

export const loginUsers = createAsyncThunk(
  "user/loginusers",
  async (data, thunkAPI) => {
    try {
      const body = {
        email: data?.email,
        password: data?.password,
      };
      const response = userApi.loginUserApi(body);
      if (!response) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  isLoading: false,
  isError: false,
  userData: null,
};
const loginUserSlice = createSlice({
  name: "loginuser",
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
      });
  },
});
export const { resetState } = loginUserSlice.actions;
export const loginuser = (state) => state.loginuser;
export default loginUserSlice.reducer;
