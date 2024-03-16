import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userApi from "./userApi";

export const getusers = createAsyncThunk(
  "user/getusers",
  async (data, thunkAPI) => {
    try {
      const res = await userApi.getusers();

      if (!res) {
        return thunkAPI.rejectWithValue(res);
      }
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  userData: null,
  userCount: null,
};

const userSlice = createSlice({
  name: "getuser",
  initialState,
  reducers: {
    resetStates: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getusers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.reverse();
        // state.userCount = action.payload.total_data_count;
      })
      .addCase(getusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
      });
  },
});

export const { resetStates } = userSlice.actions;
export const getuser = (state) => state.getuser;
export default userSlice.reducer;
