import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "./userApi";

export const registerUsers = createAsyncThunk(
  "user/registerUsers",
  async (data, thunkAPI) => {
    try {
      const body = {
        fullname: data?.fullname,
        email: data?.email,
        password: data?.password,
      };
      const res = await userApi.registerUserApi(body);
      if (!res) {
        return thunkAPI.rejectWithValue(res);
      }
      return res.data;
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

const registerUserSlice = createSlice({
  name: "registeruser",
  initialState,
  reducers: {
    resertState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
      });
  },
});
export const { resertState } = registerUserSlice.actions;
export const registeruser = (state) => state.registeruser;
export default registerUserSlice.reducer;
